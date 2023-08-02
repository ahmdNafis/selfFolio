<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    private $profile;

    public function __construct(Profile $p) {
        $this->profile = $p;
    }
    public function show($userId) {
        $profile = $this->profile->firstWhere('user_id', $userId);
        return response()->json([
            'profile' => $profile,
        ]);
    }

    public function edit(Request $request)
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     *
     * @param  \App\Http\Requests\ProfileUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */

    public function update(Request $req) {
        $profile = $this->profile->firstWhere('user_id', Auth::id());
        $image = $req->file('avatar_link');
        $flag = false;
        if($image != null) $image->move(public_path(), $image->getClientOriginalName());

        Validator::make($req->all(), [
            'profile_description' => ['required', 'max:150'],
        ]);

        if(!empty($req->input('profile_description'))) {
            $profile->profile_description = $req->input('profile_description');
            $flag = true;
        }
        if(!empty($image)) {
            $profile->avatar_link = $image->getClientOriginalName();
            $flag = true;
        }

        if($profile->save() && $flag) {
            session()->flash('message', 'Profile has been updated');
            return redirect()->route('dashboard');
        } else {
            session()->flash('deletion', 'Information is missing. Please recheck');
            return redirect()->route('dashboard');
        }
    }
   /* public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }*/

    /**
     * Delete the user's account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
