<?php

namespace App\Http\Controllers;

use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProjectCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    private $projCategory;

    public function __construct(ProjectCategory $c) {
        $this->projCategory = $c;
    }

    public function index()
    {
        $columns = ['id', 'project_category_title', 'project_category_description', 'project_category_enabled'];
        $categories = $this->projCategory->with('projects')->orderBy('created_at', 'desc')->get($columns);
        return Inertia::render('ProjectCategory/Index',[
            'columns' => $columns,
            'categories' => $categories,
        ]);
    }

    public function change($id, $type) {
        $category = $this->projCategory->find($id);
        $category->project_category_enabled = $type ? false : true;
        if($category->save()) {
            if($category->project_category_enabled)
                session()->flash('message', 'Project Category: "'.$category->project_category_title.'" has been Enabled');
            else session()->flash('deletion', 'Project Category: "'.$category->project_category_title.'" has been Disabled');
            
            return redirect()->route('projectCategory.index');
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
    public function store(Request $request)
    {
        $category = $this->projCategory->create(
            $request->validate([
                'project_category_title' => ['required', 'max:50', 'unique:project_categories'],
                'project_category_description' => ['nullable', 'max:70'],
                'project_category_enabled' => ['required', 'boolean'],
            ])
        );
        session()->flash('message', '"'.$category->project_category_title.'" has been created successfully');
        return redirect()->route('projectCategory.index');
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
        $category = $this->projCategory->find($id);

        Validator::make($request->all(), [
            'project_category_title' => ['nullable', 'unique:project_categories', 'max:50'],
            'project_category_description' => ['nullable', 'max:70'],
        ])->validate();

        foreach ($request->all() as $key => $value) {
            if($value != null && $value != $category->$key) {
                $category->$key = $value;
            }
        }

        if($category->save()) {
            session()->flash('message', '"Category ID: '.$category->id.'" has been updated');
            return redirect()->route('projectCategory.index');
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
        $category = $this->projCategory->find($id);
        if($category->delete()) {
            session()->flash('deletion', 'Comment: "'.$category->project_category_title.'" has been deleted');
            return redirect()->route('projectCategory.index');
        }
    }
}
