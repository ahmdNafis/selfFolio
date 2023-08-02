<?php

use App\Models\Profile;
use App\Models\Order;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Role;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProjectCategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FeedbackController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('auth')->group(function() {
//blog categories
Route::get('/blog_categories', [BlogCategoryController::class, 'index'])->name('blogCategory.index')->middleware('can:view,App\Models\BlogCategory');
Route::get('/blog_category/new', [BlogCategoryController::class, 'create'])->name('blogCategory.new')->middleware('can:create,App\Models\BlogCategory');
Route::get('/blog_category/edit/{id}', [BlogCategoryController::class, 'edit'])->name('blogCategory.edit')->middleware('can:update,App\Models\BlogCategory');
Route::post('/blog_category/update/{id}', [BlogCategoryController::class, 'update'])->name('blogCategory.update')->middleware('can:update,App\Models\BlogCategory');
Route::post('/blog_category/new/store', [BlogCategoryController::class, 'store'])->name('blogCategory.store')->middleware('can:create,App\Models\BlogCategory');
Route::get('/blog_category/delete/{id}', [BlogCategoryController::class, 'destroy'])->name('blogCategory.delete')->middleware('can:delete,App\Models\BlogCategory');

//posts
Route::get('/posts/{categoryId?}', [PostController::class, 'index'])->middleware('can:view,App\Models\Post')->name('post.index');
Route::get('/post/show/{id}', [PostController::class, 'show'])->name('post.show')->middleware('can:view,App\Models\Post');
Route::get('/post/new', [PostController::class, 'create'])->name('post.new')->middleware('can:create,App\Models\Post');
Route::get('/post/edit/{id}', [PostController::class, 'edit'])->name('post.edit')->middleware('can:update,App\Models\Post');
Route::post('/post/new/store', [PostController::class, 'store'])->name('post.store')->middleware('can:create,App\Models\Post');
Route::post('/post/update/{id}', [PostController::class, 'update'])->name('post.update')->middleware('can:update,App\Models\Post');
Route::get('/post/delete/{id}', [PostController::class, 'destroy'])->name('post.delete')->middleware('can:delete,App\Models\Post');
Route::get('/post/change/{id}/{type}', [PostController::class, 'change'])->name('post.change')->middleware('can:update,App\Models\Post');

//Comment
Route::get('/comments/{postId?}/{userId?}', [CommentController::class, 'index'])->name('comment.index')->middleware('can:view,App\Models\Comment');

Route::get('/comment/delete/{id}', [CommentController::class, 'destroy'])->name('comment.delete')->middleware('can:delete,App\Models\Comment');
Route::get('/comment/change/{id}/{type}', [CommentController::class, 'change'])->name('comment.change')->middleware('can:update,App\Models\Comment');

//Project Category
Route::get('/projectCategories', [ProjectCategoryController::class, 'index'])->name('projectCategory.index')->middleware('can:view,App\Models\ProjectCategory');
//Route::get('/projectCategory/new', [ProjectCategoryController::class, 'create'])->name('projectCategory.create');
Route::post('/projectCategory/new/store', [ProjectCategoryController::class, 'store'])->name('projectCategory.store')->middleware('can:create,App\Models\ProjectCategory');
Route::get('/projectCategory/change/{id}/{type}', [ProjectCategoryController::class, 'change'])->name('projectCategory.change')->middleware('can:update,App\Models\ProjectCategory');
Route::get('/projectCategory/edit/{id}', [ProjectCategoryController::class, 'edit'])->name('projectCategory.edit')->middleware('can:update,App\Models\ProjectCategory');
Route::post('/projectCategory/update/{id}', [ProjectCategoryController::class, 'update'])->name('projectCategory.update')->middleware('can:update,App\Models\ProjectCategory');
Route::get('/projectCategory/delete/{id}', [ProjectCategoryController::class, 'destroy'])->name('projectCategory.delete')->middleware('can:delete,App\Models\ProjectCategory');

//Project
Route::get('/projects', [ProjectController::class, 'index'])->name('project.index')->middleware('can:view,App\Models\Project');
Route::get('/project/show/{projectId}', [ProjectController::class, 'show'])->name('project.show')->middleware('can:view,App\Models\Project');
Route::post('/project/new/store', [ProjectController::class, 'store'])->name('project.store')->middleware('can:create,App\Models\Project');
Route::post('/project/update/{id}', [ProjectController::class, 'update'])->name('project.update')->middleware('can:update,App\Models\Project');
Route::get('/project/change/{id}/{type}', [ProjectController::class, 'change'])->name('project.change')->middleware('can:update,App\Models\Project');
Route::get('/project/delete/{id}', [ProjectController::class, 'destroy'])->name('project.delete')->middleware('can:delete,App\Models\Project');

//Contact
Route::get('/contacts', [ContactController::class, 'index'])->name('contact.index')->middleware('can:view,App\Models\Contact');
Route::get('/contact/show/{id}', [ContactController::class, 'show'])->name('contact.show')->middleware('can:view,App\Models\Contact');
Route::get('/contact/delete/{id}', [ContactController::class, 'destroy'])->name('contact.delete')->middleware('can:delete,App\Models\Contact');

//Tag
Route::get('/tags', [TagController::class, 'index'])->name('tag.index')->middleware('can:view,App\Models\Tag');
Route::post('/tag/attach/{postId}', [TagController::class, 'attach'])->name('tag.attach')->middleware('can:update,App\Models\Tag');
Route::post('/tag/detach/{postId}', [TagController::class, 'detach'])->name('tag.detach')->middleware('can:delete,App\Models\Tag');
Route::post('/tag/new/store', [TagController::class, 'store'])->name('tag.store')->middleware('can:create,App\Models\Tag');
Route::get('/tag/change/{id}/{type}', [TagController::class, 'change'])->name('tag.change')->middleware('can:update,App\Models\Tag');
Route::post('/tag/update/{id}', [TagController::class,'update'])->name('tag.update')->middleware('can:update,App\Models\Tag');
Route::get('/tag/delete/{id}', [TagController::class, 'destroy'])->name('tag.delete')->middleware('can:delete,App\Models\Tag');

//Role
Route::get('/roles', [RoleController::class, 'index'])->name('role.index')->middleware('can:view,App\Models\Role');
Route::get('/role/search/{roleId}', [RoleController::class, 'search'])->name('role.search');
Route::get('/role/change/{id}/{type}', [RoleController::class, 'change'])->name('role.change')->middleware('can:update,App\Models\Role');
Route::post('/role/new/store', [RoleController::class, 'store'])->name('role.store')->middleware('can:create,App\Models\Role');
Route::post('/role/update/{id}', [RoleController::class, 'update'])->name('role.update')->middleware('can:update,App\Models\Role');
Route::get('/role/delete/{id}', [RoleController::class, 'destroy'])->name('role.delete')->middleware('can:delete,App\Models\Role');

//User
Route::get('/users', [UserController::class, 'index'])->name('user.index')->middleware('can:view,App\Models\User');
Route::get('/user/change/{id}/{type}', [UserController::class, 'change'])->name('user.change')->middleware('can:update,App\Models\User');
Route::post('/user/role/change', [UserController::class, 'changeRole'])->name('user.role.change')->middleware('can:update,App\Models\User');
Route::post('/user/update', [UserController::class, 'update'])->name('user.exist.update')->middleware('can:update,App\Models\User');

//Profile
Route::get('/profile/show/{userId}', [ProfileController::class, 'show'])->name('profile.show')->middleware('can:view,App\Models\User');
Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.exist.update')->middleware('can:update,App\Models\Profile');

//Order
Route::get('/order/summary/{userId?}/{display?}', [OrderController::class, 'index'])->name('order.index');
Route::get('/order/change/{id}/{stage}', [OrderController::class, 'change'])->name('order.change');
Route::get('/order/completePayment/{orderId}', [OrderController::class, 'makePayment'])->name('order.pay');
Route::get('/order/payment/success', [OrderController::class, 'successPayment'])->name('order.pay.success');
Route::get('/order/payment/cancel', [OrderController::class, 'cancelledPayment'])->name('order.pay.cancel');

//feedback
Route::get('/feedbacks/{userId?}', [FeedbackController::class, 'index'])->name('feedback.index')->middleware('can:view,App\Models\Feedback');
Route::get('/feedback/rating/{userId}/{projectId}/{starCount}/{orderId}', [FeedbackController::class, 'attestRating'])->name('feedback.rating')->middleware('can:create,App\Models\Feedback');
Route::get('/feedback/searchRating/{userId}/{projectId}/{orderId}', [FeedbackController::class, 'search'])->name('feedback.search');
Route::get('/feedback/change/{id}/{type}', [FeedbackController::class, 'change'])->name('feedback.change')->middleware('can:update,App\Models\Feedback');
Route::get('/feedback/delete/{id}', [FeedbackController::class, 'destroy'])->name('feedback.remove')->middleware('can:delete,App\Models\Feedback');
});

Route::get('/contact/new', [ContactController::class, 'create'])->name('contact.new');
Route::post('/contact/store', [ContactController::class, 'store'])->name('contact.store');
Route::get('/projects/display/', [ProjectController::class, 'display'])->name('project.display');
Route::get('/project/details/{catId}', [ProjectController::class, 'projectDetails'])->name('project.detail');
Route::get('/project/price/{projectId}', [ProjectController::class, 'getPrice'])->name('project.price');
Route::post('/order/submit', [OrderController::class, 'store'])->name('order.store');
Route::get('/blog/posts', [PostController::class, 'display'])->name('blog.display');
Route::get('/blog/post/show/{postId}/{postTitle?}', [PostController::class, 'blogShow'])->name('blog.post.show');
Route::get('/blog/post/category/{categoryTitle}/{listShow?}', [PostController::class, 'categoryPost'])->name('blog.post.category');
Route::post('/comment/new/store/{postId?}', [CommentController::class, 'store'])->name('comment.store');
Route::get('/user/role/{id}', [UserController::class, 'fetchRole'])->name('user.role');

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home.index');

Route::get('/dashboard', function () {

    if(Hash::check('123456789abc', Auth::user()->password)) {
        session()->flash('deletion', 'Please update your password. You have system generated password');
    }
    return Inertia::render('Dashboard', [
        'user' => Auth::user(),
        'profile' => Profile::firstWhere('user_id', Auth::id()),
        'props.panelVisible' => Auth::user()->role()->first()->role_title == 'Admin' ? false : true,
        'props.dates' => array_values(array_unique(Order::select('initiate_date')->pluck('initiate_date')->toArray())),
        'props.prices' => Order::selectRaw('sum(total_price) as price, DATE(initiate_date) as date')->groupBy('initiate_date')->pluck('price')->toArray(),
        'props.quantities' => Order::selectRaw('sum(total_quantity) as quantity, DATE(initiate_date) as date')->groupBy('initiate_date')->pluck('quantity')->toArray(),
        'props.orders' => Order::get(),
        'props.incompleteOrders' => Order::where('completion_date', null)->get(),
        'props.posts' => Post::get(),
        'props.unpublishedPosts' => Post::where('published', false)->get(),
        'props.comments' => Comment::get(),
        'props.unapprovedComments' => Comment::where('posted', false)->get(),
        'props.customers' => Role::where('role_title', 'Customer')->first()->users()->where('user_enabled', true)->get(),
        'props.commentators' => Role::where('role_title', 'Commentator')->first()->users()->where('user_enabled', true)->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
