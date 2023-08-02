<?php

namespace App\Policies;

use App\Policies\CheckPermission;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectCategoryPolicy
{
    use HandlesAuthorization;
    public function before() {
        return Auth::user()->role()->first()->role_title == 'Admin' ? Response::allow() : null;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ProjectCategory  $projectCategory
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view()
    {
        return (new CheckPermission())->check_access('project_category', 'read') 
                ? Response::allow() 
                : Response::deny('Not Authroized to View Project Categories');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create()
    {
        return (new CheckPermission())->check_access('project_category', 'write') 
                ? Response::allow() 
                : Response::deny('Not Authroized to Create a New Project Category');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ProjectCategory  $projectCategory
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update()
    {
        return (new CheckPermission())->check_access('project_category', 'update') 
                ? Response::allow() 
                : Response::deny('Not Authroized to Update Project');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ProjectCategory  $projectCategory
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete()
    {
        return (new CheckPermission())->check_access('project_category', 'delete') 
                ? Response::allow() 
                : Response::deny('Not Authroized to Delete Project');
    }
}
