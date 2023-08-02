<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Models\Post;
use App\Models\BlogCategory;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use Carbon\Carbon;

class PostController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $post;
    private $category;

    public function __construct(Post $p, BlogCategory $cat, Tag $t) {
        $this->post = $p;
        $this->category = $cat;
        $this->tag = $t;
    }

    public function index($categoryId = null)
    {
        $this->authorize('view', Post::class);
        $columns = ['id', 'published_date', 'heading', 'published'];
        $allPostCount = $this->post->all()->count();
        $posts = $categoryId ? $this->category->find($categoryId)->posts()->with('tags')->with('comments')->get($columns) : $this->post->with('tags')->with('comments')->orderBy('created_at', 'desc')->get($columns);
        $tags = $this->tag->where('tag_enabled', true)->get(['id', 'tag_name']);
        return Inertia::render('Post/Index', [
            'postCount' => $allPostCount,
            'posts' => $posts,
            'columns' => $columns,
            'tags' => $tags,
        ]);
    }

    public function change($id, $type) {
        $post = $this->post->find($id);
        $post->published = $type ? false : true;
        if($post->save()) {

            if($post->published)
                session()->flash('message', 'Post: "'.$post->heading.'" has been Published');
            else session()->flash('deletion', 'Post: "'.$post->heading.'" has been Unpublished');
            
            return redirect()->route('post.index');
        }
    }

    public function display() {
        $post = $this->post->where('published', true)->latest();
        $latestPost = $post->with('category:blog_category_title,id')->first();
        $postsLatest = $post->where('id', '!=', $latestPost->id)->take(4)->get();
        $categories = $this->category->where('blog_category_activity', true)->whereHas('posts', function($q) {
            $q->where('published', true);
        })->with('posts')->latest()->take(5)->get(['id', 'blog_category_title']);
        return Inertia::render('Post/DisplayPost', [
            'latestPost' => $latestPost,
            'postsLatest' => $postsLatest,
            'categories' => $categories,
        ]);
    }

    public function categoryPost($categoryTitle, $listShow) {
        $post = $this->category->firstWhere('blog_category_title', $categoryTitle)->posts()->where('published', true)->get(['id', 'published_date', 'heading', 'description', 'image_url']);
        
        if($listShow == 'inertia') {
            return Inertia::render('Post/CategoryWiseShow', [
                'posts' => $post,
                'categoryTitle' => $categoryTitle,
            ]);
        } 

        if($listShow == 'json') {
            return response()->json([
                'post' => $post,
            ]);
        }
        
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Post/NewPost', [
            'categories' => $this->category->get(['id', 'blog_category_title']),
        ]);
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
            'published_date' => 'required|date',
            'heading' => 'required|max:70|unique:posts',
            'description' => 'nullable|max:250',
            'body' => 'required',
            'blog_category_id' => 'required',
            'image_url' => 'required',
            'caption' => 'required|max:60',
        ])->validate();

        $image = $request->file('image_url');
        $image->move(public_path(), $image->getClientOriginalName());

        $this->post->create([
            'heading' => $request->input('heading'),
            'description' => $request->input('description'),
            'body' => $request->input('body'),
            'blog_category_id' => $request->input('blog_category_id'),
            'published' => true,
            'user_id' => Auth::id(),
            'image_url' => $image->getClientOriginalName(),
            'published_date' => Carbon::parse($request->input('published_date'))->format('Y-m-d'),
            'caption' => $request->input('caption'),
        ]);
        
        session()->flash('message', "'".$request->heading."' has been created");
        return redirect()->route('post.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = $this->post->find($id);
        $comments = $post->comments()->where('posted', true)->with('commentator:first_name,last_name,id')->get(['posted_date', 'subject', 'comment_body', 'user_id']);
        return Inertia::render('Post/ShowPost', [
            'post' => $post,
            'comments' => $comments,

        ]);
    }

    public function blogShow($postId, $postTitle=null) {
        $blog = $this->post->with('category')->with('comments', function($q) {
            $q->where('posted', true)->with('commentator:first_name,last_name,id');
        })->with('tags', function($a) {
            $a->where('tag_enabled', true);
        })->find($postId);
        return Inertia::render('Post/BlogShow', ['post' => $blog]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post = $this->post->with('category:blog_category_title,id')->find($id);
        $categories = $this->category->get(['id', 'blog_category_title']);
        return Inertia::render('Post/EditPost', [
            'posts' => $post,
            'categories' => $categories,
        ]);
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
        Validator::make($request->all(), [
            'published_date' => 'nullable|date',
            'heading' => 'nullable|max:100',
            'description' => 'nullable|max:150',
            'body' => 'nullable',
            'caption' => 'nullable|max:60',
        ])->validate();

        $post = $this->post->find($id);
        
        foreach ($request->all() as $key => $value) {
            if($value != null) {
                if($value != $post->$key) {
                    if($key == 'image_url') $post->$key = public_path().'/'.$request->input('image_url')->getClientOriginalName();
                    else $post->$key = $value;
                }
            }
        }
        
        if($post->save()) {
            session()->flash('message', '"'.$post->heading.'" has been updated');
            return redirect()->route('post.index');
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
        $post = $this->post->find($id);
        $heading = $post->heading;
        if($post->delete()) {
            session()->flash('deletion', '"'.$heading.'" has been deleted');
            return redirect()->route('post.index');
        }
    }
}
