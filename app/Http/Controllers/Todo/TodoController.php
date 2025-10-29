<?php

namespace App\Http\Controllers\Todo;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TodoController extends BaseController
{
    public function createTodo(Request $request)
    {
        return response()->json('message');
    }
}
