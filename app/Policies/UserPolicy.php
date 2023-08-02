<?php

namespace App\Policies;

use App\Policies\CheckPermission;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;
    public function before() {
        return Auth::user()->role()->first()->role_title == 'Admin' ? Response::allow() : null;
    }

    public function view()
    {
        return (new CheckPermission())->check_access('user', 'read') 
                ? Response::allow() 
                : Response::deny('Not Authorized to View User');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create()
    {
        return (new CheckPermission())->check_access('user', 'write') 
                ? Response::allow() 
                : Response::deny('Not Authroized to Write User');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update()
    {
        return (new CheckPermission())->check_access('user', 'update') 
                ? Response::allow() 
                : Response::deny('Not Authroized to Update User');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete()
    {
        return (new CheckPermission())->check_access('user', 'delete') 
                ? Response::allow() 
                : Response::deny('Not Authroized to Delete User');
    }
}
