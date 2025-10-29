<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'unique:users,email',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = User::create($request->all());
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['user'] =  $user;
        return $this->sendResponse($success, 'User register successfully.');
    }

    public function login(Request $request): JsonResponse
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['name'] =  $user->name;

            return $this->sendResponse($success, 'User login successfully.');
        }
        else{
            return $this->sendError('Invalid Credentials.', ['error'=>'Invalid Credentials']);
        }
    }

    public function logout(): JsonResponse
    {
        $user = Auth::user();
        Auth::logout($user);
        return $this->sendResponse(true, 'User Logout successfully.');
    }
}
