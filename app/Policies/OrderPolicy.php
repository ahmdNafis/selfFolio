<?php

namespace App\Policies;

use App\Policies\CheckPermission;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
    use HandlesAuthorization;

    public function before() {
        return Auth::user()->role()->first()->role_title == 'Admin' ? Response::allow() : null;
    }

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function view()
    {
        return (new CheckPermission())->check_access('order', 'read') 
                ? Response::allow() 
                : Response::deny('Not Authorized to View Order');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create()
    {
        return (new CheckPermission())->check_access('order', 'write') 
                ? Response::allow() 
                : Response::deny('Not Authorized to Create Order');
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
        return (new CheckPermission())->check_access('order', 'update') 
                ? Response::allow() 
                : Response::deny('Not Authorized to Update Order');
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
        return (new CheckPermission())->check_access('order', 'delete') 
                ? Response::allow() 
                : Response::deny('Not Authorized to Delete Order');
    }
}
