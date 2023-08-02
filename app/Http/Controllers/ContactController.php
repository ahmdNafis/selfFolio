<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private $contact;

    public function __construct(Contact $c) {
        $this->contact = $c;
    }

    public function index()
    {
        $columns = ['id', 'submission_date', 'message_title', 'email'];
        $contacts = $this->contact->orderBy('created_at', 'desc')->get($columns);
        return Inertia::render('Contact/Index', [
            'columns' => $columns,
            'contacts' => $contacts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Contact/NewContact');    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        Validator::make($req->all(), [
            'name' => ['required', 'max:100'],
            'email' => ['required', 'max:120', 'email'],
            'message_title' => ['required', 'max:200'],
            'message_body' => ['required', 'max:250'],
        ]);

        $contact = $this->contact->create([
            'submission_date' => Carbon::now()->format('Y-m-d'),
            'message_title' => $req->input('message_title'),
            'email' => $req->input('email'),
            'name' => $req->input('name'),
            'message_body' => $req->input('message_body'),
        ]);

        if($contact) {
            session()->flash('message', 'Your proposal/message has been submitted. We will shortly get back to you.');
            return redirect()->route('contact.new');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contact = $this->contact->find($id);
        return response()->json([
            'contact' => $contact,
        ]);
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
        $contact = $this->contact->find($id);
        $title = $contact->message_title;
        if($contact->delete()) {
            session()->flash('deletion', '"'.$title.'" has been deleted');
            return redirect()->route('contact.index');
        }
    }
}
