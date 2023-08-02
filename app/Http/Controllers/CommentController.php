<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

use App\Models\Comment;
use App\Models\User;
use App\Models\Profile;
use App\Models\Role;

use Carbon\Carbon;

use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $comment;
    private $user;
    private $profile;

    public function __construct(Comment $c, User $u, Profile $p) {
        $this->comment = $c;
        $this->user = $u;
        $this->profile = $p;
    }

    public function index($postId = null, $userId = null)
    {
        if(Auth::user()->role()->first()->role_title != 'Admin') $userId = Auth::id();
        $columns = ['id', 'posted_date', 'subject', 'posted'];
        $comments = $userId ? $this->user->find($userId)->comments()->select('id', 'post_id', 'posted_date', 'subject', 'posted')->with('post', function($q) {
            $q->where('published', true);
        })->get($columns) : $this->comment->with('post:heading,id')->orderBy('created_at', 'desc')->get($columns);
        
        return Inertia::render('Comment/Index', [
            'comments' => $comments,
            'columns' => $columns,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function change($id, $type) {
        $comment = $this->comment->find($id);
        $comment->posted = $type ? false : true;
        if($comment->save()) {
            if($comment->posted)
                session()->flash('message', 'Comment: "'.$comment->subject.'" has been Approved');
            else session()->flash('deletion', 'Comment: "'.$comment->subject.'" has been Rejected');
            return redirect()->route('comment.index');
        }
    }

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
        Validator::make($request->all(), [
            'email' => ['required', 'string', 'unique:users', 'email', 'max:255'],
            'first_name' => ['required', 'string', 'max:70'],
            'subject' => ['required', 'string', 'max:150', 'unique:comments'],
            'comment_body' => ['required', 'max:200'],
        ]);
        $name = $request->input('first_name');
        $email = $request->input('email');
        $date = Carbon::now()->format('Y-m-d');

        $user = $this->user->firstOrCreate([
            'email' => $email
        ],
        [
            'email' => $email,
            'first_name' => $name,
            'password' => Hash::make('123456789abc'),
            'user_enabled' => true,
            'role_id' => Role::firstWhere('role_title', 'Commentator')->id,
        ]
        );

        $profile = $this->profile->firstOrCreate([
            'user_id' => $user->id,
        ]);
        
        $comment = $this->comment->create([
            'posted_date' => $date,
            'subject' => $request->input('subject'),
            'comment_body' => $request->input('comment_body'),
            'posted' => false,
            'post_id' => $request->input('post_id'),
            'user_id' => $user->id,
        ]);

        event(new Registered($user));

        Auth::login($user);

        if($comment) {
            session()->flash('message', 'Comment is under review. We will post it when we\'re done reviewing');
            return redirect()->back();
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
        $comment = $this->comment->find($id);
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
        $comment = $this->comment->find($id);
        if($comment->delete()) {
            session()->flash('message', 'Comment: "'.$comment->subject.'" has been deleted');
            return redirect()->route('comment.index');
        }
    }
}
