<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $project;
    private $category;

    public function __construct(Project $p, ProjectCategory $c) {
        $this->project = $p;
        $this->category = $c;
    }

    public function index()
    {
        $columns = ['id', 'project_title', 'project_description', 'image_url', 'project_published', 'price', 'project_link'];
        $projects = $this->project->select('*')->with('project_category:project_category_title,id')->orderBy('created_at', 'desc')->get($columns);
        return Inertia::render('Project/Index', [
            'columns' => $columns,
            'projects' => $projects,
            'categories' => $this->category->get(['id', 'project_category_title']),
        ]);
    }

    public function display() {
        $categories = $this->category->where('project_category_enabled', true)->with('projects')->get(['id', 'project_category_title']);
        return Inertia::render('Project/Display', [
            'categories' => $categories,
        ]);
    }

    public function projectDetails($catId) {
        $projects = $this->category->find($catId)->projects()->with('feedbacks')->where('project_published', true)->get();
        return response()->json([
            'projects' => $projects,
        ]);
    }

    public function getPrice($projectId) {
        $projectPrice = $this->project->find($projectId)->price;
        return response()->json([
            'price' => $projectPrice,
        ]);
    }

    public function change($id, $type) {
        $project = $this->project->find($id);
        $project->project_published = $type ? false : true;
        if($project->save()) {
            if($project->project_published)
                session()->flash('message', 'Project: "'.$project->project_title.'" has been Published');
            else session()->flash('deletion', 'Project: "'.$project->project_title.'" has been Unpublished');
            return redirect()->route('project.index');
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
        Validator::make($request->all(), [
            'project_title' => ['required', 'max:70', 'unique:projects'],
            'project_link' => ['required', 'unique:projects'],
            'project_description' => ['required'],
            'project_published' => ['required', 'boolean'],
            'image_url' => ['required'],
            'project_category_id' => ['required'],
            'price' => ['required'],
        ])->validate();

        $image = $request->file('image_url');
        $image->move(public_path(), $image->getClientOriginalName());

        $this->project->create([
            'project_title' => $request->input('project_title'),
            'project_link' => $request->input('project_link'),
            'project_description' => $request->input('project_description'),
            'image_url' => $image->getClientOriginalName(),
            'project_published' => $request->input('project_published'),
            'user_id' => Auth::id(),
            'price' => $request->input('price'),
            'project_category_id' => $request->input('project_category_id'),
        ]);

        session()->flash('message', '"'.$request->input('project_title').'" has been created');
        return redirect()->route('project.index');
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
        $project = $this->project->find($id);
        Validator::make($request->all(), [
            'project_title' => ['nullable', 'max:70', 'unique:projects'],
            'project_link' => ['nullable', 'unique:projects'],
            'project_description' => ['nullable', 'max:100'],
            'image_url' => ['nullable'],
            'project_category_id' => ['nullable', 'integer'],
            'price' => ['nullable'],
        ])->validate();

        foreach ($request->all() as $key => $value) {
            if($value != null && $value != $project->$key) {
                $project->$key = $value;
            }
        }

        if($project->save()) {
            session()->flash('message', '"Project ID: '.$project->id.'" has been updated');
            return redirect()->route('project.index');
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
        $project = $this->project->find($id);
        $title = $project->project_title;
        if($project->delete()) {
            session()->flash('deletion', 'Project: "'.$title.'" has been Deleted');
            return redirect()->route('project.index');
        }
    }
}
