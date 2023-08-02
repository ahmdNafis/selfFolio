<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Policies\PostPolicy;
use App\Models\Post;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\Response;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Models\Project' => 'App\Policies\ProjectPolicy',
        'App\Models\ProjectCategory' => 'App\Policies\ProjectCategoryPolicy',
        'App\Models\Post' => 'App\Policies\PostPolicy',
        'App\Models\BlogCategory' => 'App\Policies\BlogCategoryPolicy',
        'App\Models\Comment' => 'App\Policies\CommentPolicy',
        'App\Models\Contact' => 'App\Policies\ContactPolicy',
        'App\Models\Profile' => 'App\Policies\ProfilePolicy',
        'App\Models\Role' => 'App\Policies\RolePolicy',
        'App\Models\Tag' => 'App\Policies\TagPolicy',
        'App\Models\User' => 'App\Policies\UserPolicy',
        'App\Models\Order' => 'App\Policies\OrderPolicy',
        'App\Models\Feedback' => 'App\Policies\FeedbackPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {

        $this->registerPolicies();

        Gate::before(function($user) {
            if(!$user->user_enabled) return Response::deny('User not activated. Please contact admin');
            if($user->role()->first() != null && $user->user_enabled && $user->role()->first()->role_title == 'Admin') {
                return Response::allow();
            }
        });
    }
}
