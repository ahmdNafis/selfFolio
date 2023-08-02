<?php

namespace App\Policies;

use App\Policies\CheckPermission;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactPolicy
{
    use HandlesAuthorization;

    public function before() {
        return Auth::user()->role()->first()->role_title == 'Admin' ? Response::allow() : null;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view()
    {
        return (new CheckPermission())->check_access('contact', 'read') 
                ? Response::allow() 
                : Response::deny('Not Authorized to Read Comment');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create()
    {
        return (new CheckPermission())->check_access('contact', 'write') 
                ? Response::allow() 
                : Response::deny('Not Authorized to Write Comment');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update()
    {
        return (new CheckPermission())->check_access('contact', 'update') 
                ? Response::allow() 
                : Response::deny('Not Authorized to Update Comment');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete()
    {
        return (new CheckPermission())->check_access('contact', 'delete') 
                ? Response::allow() 
                : Response::deny('Not Authorized to Delete Comment');
    }
}
