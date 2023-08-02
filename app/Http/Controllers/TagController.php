<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $tag;
    private $post;

    public function __construct(Tag $t, Post $p) {
        $this->tag = $t;
        $this->post = $p;
    }

    public function index()
    {
        $columns = ['id', 'tag_name', 'tag_enabled'];
        $tags = $this->tag->with('posts')->orderBy('created_at', 'desc')->get($columns);
        return Inertia::render('Tag/Index', [
            'tags' => $tags,
            'columns' => $columns,
        ]);
    }

    public function change($id, $type) {
        $tag = $this->tag->find($id);
        $tag->tag_enabled = $type ? false : true;
        if($tag->save()) {

            if($tag->tag_enabled)
                session()->flash('message', 'Tag: "'.$tag->tag_name.'" has been Enabled');
            else session()->flash('deletion', 'Tag: "'.$tag->tag_name.'" has been Disabled');
            
            return redirect()->route('tag.index');
        }
    }

    public function attach(Request $req, $postId) {
        //Validator::make($req->input('tagId'), [
          //  'tagId' => ['required'],
        //])->validate();
        $tags = $req->input('tags');
        $attachTags = [];
        if(empty($tags)) {
            session()->flash('deletion', 'No Tags chosen');
        }
        $post = $this->post->find($postId);
        for ($i=0; $i < count($tags); $i++) {
            if($post->tags()->count()!=0) {
                $tagList = $post->tags()->pluck('id')->toArray();
                if(!in_array($tags[$i], $tagList)) {
                    $post->tags()->attach($this->tag->find($tags[$i]));
                    array_push($attachTags, $tags[$i]);
                }
            } else {
                array_push($attachTags, $tags[$i]);
                $post->tags()->attach($this->tag->find($tags[$i]));
            }
        }
        session()->flash('message', 'Tags: "'.implode(',', $attachTags).'" has been added to Post ID: "'.$post->id.'"');
        return redirect()->route('post.index');
    }

    public function detach(Request $req, $postId) {
        $tags = $req->input('tags');
        if(empty($tags)) {
            session()->flash('deletion', 'No Tags chosen');
        }
        $post = $this->post->find($postId);
        for ($i=0; $i < count($tags); $i++) { 
            $post->tags()->detach($this->tag->find($tags[$i]));
        }
        session()->flash('deletion', 'Tags: "'.implode(',', $tags).'" has been Removed from Post ID: "'.$post->id.'"');
        return redirect()->route('post.index');
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
         Validator::make($request->all(), [
            'tag_name' => ['required', 'max:30', 'unique:tags'],
        ])->validate();

        $tag = $this->tag->create([
            'tag_name' => $request->input('tag_name'),
            'tag_enabled' => true,
        ]);

        session()->flash('message', 'Tag: "'.$tag->tag_name.'" has been created');
        return redirect()->route('tag.index');
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
    public function update(Request $request, $id)
    {
        $tag = $this->tag->find($id);
        Validator::make($request->all(), [
            'tag_name' => ['required', 'max:30', 'unique:tags'],
        ])->validate();

        if($request->input('tag_name') != null && $request->input('tag_name') != $tag->tag_name) {
            $tag->tag_name = $request->input('tag_name');
            if($tag->save()) {
                session()->flash('message', 'Tag ID: "'.$tag->id.'" has been updated');
                return redirect()->route('tag.index');
            }
        } else {
            session()->flash('deletion', 'Tag ID: "'.$tag->id.'" cannot have an empty title');
            return redirect()->route('tag.index');
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
        $tag = $this->tag->find($id);
        $title = $tag->tag_name;
        if($tag->delete()) {
            session()->flash('deletion', 'Tag ID: "'.$title.'" has been Deleted');
            return redirect()->route('tag.index');
        }
    }
}
