<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\BlogCategory;

use Inertia\Inertia;

class BlogCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $categories;
    public function __construct(BlogCategory $b) {
        $this->categories = $b;
    }
    public function index()
    {
        $columns = ['id', 'blog_category_title', 'blog_category_activity'];
        $categories = $this->categories->with('posts')->orderBy('created_at','desc')->get($columns);

        return Inertia::render('BlogCategory/Index', [
            'categories' => $categories,
            'columns' => $columns,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('BlogCategory/NewCategory');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $category = BlogCategory::create(
            $req->validate([
                'blog_category_title' => ['required', 'unique:blog_categories', 'max:100'],
                'blog_category_description' => ['max:200'],
                'blog_category_activity' => ['boolean'],
            ])
        );
        session()->flash('message', '"'.$category->blog_category_title.'" has been created successfully');
        return redirect()->route('blogCategory.index');
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
        $category = BlogCategory::find($id);
        return Inertia::render('BlogCategory/EditCategory', ['category' => $category]);
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
        $category = BlogCategory::find($id);
        $category->update(
            $request->validate([
                'blog_category_title' => ['unique:blog_categories', 'max:50'],
                'blog_category_description' => ['max:70'],
            ])
        );
        session()->flash('message', '"Category ID: '.$category->id.'" has been updated');
        return redirect()->route('blogCategory.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = BlogCategory::find($id);
        $title = $category->blog_category_title;
        if($category->delete()) {
            session()->flash('deletion', '"'.$title.'" has been deleted successfully');
            return redirect()->route('blogCategory.index');
        }
    }
}
