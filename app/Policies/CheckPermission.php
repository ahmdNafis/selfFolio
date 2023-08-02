<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CheckPermission {
	private $user;

	public function __construct() {
		$this->user = Auth::user();
	}

	public function check_access(String $access, String $permission) {
		$perm = json_decode($this->user->role()->first()->role_permissions);
		return in_array($access.':'.$permission, $perm);
	}
}