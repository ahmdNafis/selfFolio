<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Profile;
use Carbon\Carbon;
use App\Models\Role;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;

use Srmklive\PayPal\Services\PayPal as PayPalClient;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $order;
    private $user;
    private $profile;

    public function __construct(Order $o, User $u, Profile $p) {
        $this->order = $o;
        $this->user = $u;
        $this->profile = $p;
    }

    public function index($userId = null, $display = false)
    {
        $columns = ['id', 'initiate_date', 'completion_date', 'tracking_id', 'tracking_stage', 'total_price', 'total_quantity', 'paid', 'payment_date'];
        if(!$display) {
            if(($userId == null || $userId != Auth::id()) && Auth::user()->role()->first()->role_title == 'Customer') $userId = Auth::id();
            
            $orders = $userId ? $this->user->find($userId)->orders()->with('projects')->orderBy('created_at', 'desc') : $this->order->orderBy('created_at', 'desc');

            if(Hash::check('123456789abc', Auth::user()->password)) {
                session()->flash('deletion', 'Please update your password');
            }

            if($userId && in_array(false, array_values(array_unique($orders->pluck('paid')->toArray())))) {
                session()->flash('deletion', 'Please complete your payments');
            }

            return Inertia::render('Order/Index', [
                'orders' => $orders->get($columns),
                'columns' => $columns,
            ]);      

        } else {
            $orders = $this->user->find($userId)->orders()->with('projects')->orderBy('created_at', 'desc')->take(5)->get($columns);

            return response()->json([
                'orders' => $orders,
            ]);
        }
        
    }

    public function change($id, $stage) {
        $order = $this->order->find($id);
        if($stage == 'delivered') $order->completion_date = Carbon::now()->format('Y-m-d');
        if($order->tracking_stage == 'delivered' && $stage != 'delivered') $order->completion_date = null;
        $order->tracking_stage = $stage;
        if($order->save()) {
            session()->flash('message', 'Order ID: '.$order->id.' has been changed to "'.$stage.'"');
            return redirect()->route('order.index');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $projects = $req->input('projects')[0];

        Validator::make($req->all(), [
            'email' => ['required', 'string', 'unique:users', 'email', 'max:255'],
            'first_name' => ['required', 'string', 'max:70'],
            'last_name' => ['required', 'max:70', 'string'],
            'address' => ['required', 'max:255'],
            'city' => ['required', 'string', 'max:80'],
            'country' => ['required', 'string', 'max:100'],
        ]);

        $date = Carbon::now()->format('Y-m-d');
        $price = $req->input('total_price');
        $quantity = $req->input('total_quantity');
        $note = $req->input('notes');
        $trackingId = mt_rand(10000000, 999999999);

        $user = $this->user->firstOrCreate(
            ['email' => $req->input('email')],
            [
                'email' => $req->input('email'),
                'first_name' => $req->input('first_name'),
                'last_name' => $req->input('last_name'),
                'password' => Hash::make('123456789abc'),
                'city' => $req->input('city'),
                'country' => $req->input('country'),
                'address' => $req->input('address'),
                'cellphone' => $req->input('cellphone'),
                'user_enabled' => true,
                'role_id' => Role::firstWhere('role_title', 'Customer')->id,
            ]
        );

        $profile = $this->profile->firstOrCreate([
            'user_id' => $user->id,
        ]);

        $order = $this->order->create([
            'initiate_date' => $date,
            'total_price' => $price,
            'total_quantity' => $quantity,
            'user_id' => $user->id,
            'tracking_stage' => 'pending',
            'notes' => $note,
            'tracking_id' => Order::firstWhere('tracking_id', $trackingId) == null ? $trackingId : $trackingId++,
        ]);

        for ($i=0; $i < count($projects); $i++) { 
            $order->projects()->attach($projects[$i]['id'], [
                'quantity' => $projects[$i]['quantity'],
                'price' => $projects[$i]['price'],
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        if($order) {
            session()->flash('deletion', 'Please Change Your Password');
            session()->flash('message', $quantity.' items has been placed as your order. Thank you for your purchase.');
            return redirect()->route('order.index', ['userId' => $user->id]);
        }
    }

    public function makePayment($orderId) {
        $order = $this->order->find($orderId);
        
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();
        
        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('order.pay.success'),
                "cancel_url" => route('order.pay.cancel'),
            ],
            "purchase_units" => [
                0 => [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $order->total_price,
                    ]
                ]
            ]
        ]);

        if (isset($response['id']) && $response['id'] != null) {
            // redirect to approve href
            foreach ($response['links'] as $links) {
                if ($links['rel'] == 'approve') {
                    $order->paid = true;
                    $order->payment_date = Carbon::now()->format('Y-m-d');

                    if($order->save()) {
                        session()->flash('message', 'Payment has been successful via Paypal');
                        return redirect()->route('order.index');
                    }
                }
            }
            session()->flash('deletion', 'Payment not Made');
            return redirect()->route('order.index');
        } else {
            session()->flash('deletion', 'Payment not Made');
            return redirect()->route('order.index');
        }
    }

    public function successPayment() {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();

        $response = $provider->capturePaymentOrder($request['token']);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            session()->flash('message', 'Payment Completed');
            return redirect()->route('order.index');
        } else {
            session()->flash('deletion', $response['message'].' Payment not Made');
            return redirect()->route('order.index');
        }
    }

    public function cancelledPayment() {
        session()->flash('deletion', $response['message'].' Payment Cancelled');
        return redirect()->route('order.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
