<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $role;
    private $permission;

    public function __construct(Role $r) {
        $this->role = $r;
        $this->permission =  [
            'blog_category:read', 'blog_category:write', 'blog_category:update', 'blog_category:delete', 
            'comment:read', 'comment:write', 'comment:update','comment:delete',
            'contact:read', 'contact:write','contact:update','contact:delete',
            'post:read', 'post:write', 'post:update', 'post:delete', 
            'profile:read', 'profile:write', 'profile:update', 'profile:delete', 
            'project:read', 'project:write','project:update',  'project:delete', 
            'project_category:read', 'party_collection:write', 'project_category:update', 'project_category:delete', 
            'role:read','role:write','role:update','role:delete',
            'tag:read','tag:write','tag:update','tag:delete',
            'user:read','user:write','user:update','user:delete',
            'order:read', 'order:write', 'order:update', 'order:delete',
        ];
    }

    public function index()
    {
        $columns = ['id', 'role_title', 'role_activity'];
        $roles = $this->role->with('users')->orderBy('created_at', 'desc')->get($columns);
        return Inertia::render('Role/Index', [
            'roles' => $roles,
            'columns' => $columns,
            'permissions' => $this->permission,
        ]);
    }

    public function search($roleId) {
        $role = $this->role->find($roleId);
        return response()->json([
            'role' => $role,
        ]); 
    }

    public function change($id, $type) {
        $role = $this->role->find($id);
        $role->role_activity = $type ? false : true;
        if($role->save()) {
            if($role->role_activity)
                session()->flash('message', 'Role: "'.$role->role_title.'" has been Enabled');
            else session()->flash('deletion', 'Role: "'.$role->role_title.'" has been Disabled');
            
            return redirect()->route('role.index');
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
            'role_title' => ['required', 'max:30', 'unique:roles'],
            'role_permissions' => ['required'],
        ])->validate();
        
        $role = new Role();
        $role->role_title = $request->input('role_title');
        $role->role_permissions = json_encode($request->input('role_permissions'));
        $role->role_activity = true;

        if($role->save()) {
            session()->flash('message', 'Role: "'.$role->role_title.'" has been created');
            return redirect()->route('role.index');
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
        $role = $this->role->find($id);
        Validator::make($request->all(), [
            'role_title' => ['nullable', 'max:30', 'unique:roles'],
        ])->validate();

        $perm = $request->input('role_permissions');
        $title = $request->input('role_title');

        if($title != null && $title != $role->role_title) {
            $role->role_title = $title;
        } 

        if(!empty($perm)) $role->role_permissions = json_encode($perm);

        if($title == null && empty($perm)) {
            session()->flash('deletion', 'Both Fields Cannot be empty!');
            return redirect()->route('role.index');
        }

        if($role->save()) {
            session()->flash('message', 'Role ID: "'.$role->id.'" has been updated');
            return redirect()->route('role.index');
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
        $role = $this->role->find($id);
        $title = $role->role_title;
        if($role->delete()) {
            session()->flash('deletion', 'Role: "'.$title.'" has been Deleted');
            return redirect()->route('role.index');
        }
    }
}
