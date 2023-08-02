<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $user;
    private $role;

    public function __construct(User $u, Role $r) {
        $this->user = $u;
        $this->role = $r;
    }

    public function index()
    {
        $columns = ['id', 'first_name', 'last_name', 'email', 'user_enabled'];
        $users = $this->user->select('id', 'role_id', 'first_name', 'last_name', 'email', 'user_enabled')->with('role')->with('comments')->with('orders')->with('posts')->get($columns);
        return Inertia::render('User/Index', [
            'users' => $users,
            'columns' => $columns,
            'roles' => $this->role->where('role_activity', true)->get(['role_title', 'id']),
        ]);

    }

    public function change($id, $type) {
        $user = $this->user->find($id);
        $user->user_enabled = $type ? false : true;
        if($user->save()) {
            if($user->user_enabled)
                session()->flash('message', 'User ID: "'.$user->id.'" has been Enabled');
            else session()->flash('deletion', 'User ID: "'.$user->id.'" has been Disabled');
            
            return redirect()->route('user.index');
        }
    }

    public function changeRole(Request $req) {
        Validator::make($req->all(), [
            'role_id' => ['required'],
        ]);
        $role = $this->role->find($req->input('role_id'));
        $user = $this->user->find($req->input('user_id'));

        if($user->role()->get()!=null) $user->role()->dissociate()->save();

        if($user->role()->associate($role)->save()) {
            session()->flash('message', 'Role change to "'.$role->role_title.'" for User ID: '.$user->id);
            return redirect()->route('user.index');
        } else {
            session()->flash('deletion', 'Failed to change role');
            return redirect()->route('user.index');
        }
    }

    public function fetchRole($id) {
        $role = $this->user->find($id)->role()->first();
        return response()->json([
            'role' => $role,
        ]);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $req)
    {
        $user = $this->user->find(Auth::id());
        Validator::make($req->all(), [
            'first_name' => ['string','max:100', 'unique:users'],
            'last_name' => ['string', 'max:100'],
            'city' => ['string', 'max:50'],
            'country' => ['string', 'max:50'],
            'address' => ['string', 'max:200'],
        ]);

        $flag = true;
        foreach ($req->all() as $key => $value) {
            if($value != null) {
                if($key == 'password') {
                    if(!Hash::check($value, $user->password)) {
                        $user->$key = Hash::make($value);
                    } else $flag = false;
                } elseif($value != $user->$key) $user->$key = $value;
            }
        }

        if($user->save() && $flag) {
            session()->flash('message', 'Details have been saved');
            return redirect()->route('dashboard');
        } else {
            session()->flash('deletion', 'Cannot accept previous inputs');
            return redirect()->back();
        }
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
