<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WebsiteBlogController extends Controller
{
    public function index(Request $request)
    {
        $blogs = Blog::with('user:id,name')->get()
        ->map(function ($blog){
            $blog->image_path = asset('storage/blogs/'.$blog->image_path);
            $blog->author = $blog->user ? $blog->user->name : 'Unknown Author';
            return $blog;
        });
        if ($request->query('filter')){
            $blogs = Blog::with('user:id,name')->where('title','LIKE', '%'.$request->query('filter').'%')->get()
                ->map(function ($blog){
                    $blog->image_path = asset('storage/blogs/'.$blog->image_path);
                    $blog->author = $blog->user ? $blog->user->name : 'Unknown Author';
                    return $blog;
                });
        }

        return response()->json($blogs);
    }

    public function detail(Blog $blog)
    {
        $blog->load('user:id,name');
        $blog->image_path = asset('storage/blogs/' . $blog->image_path);
        $blog->author = $blog->user ? $blog->user->name : 'Unknown Author';
        $blog->created_at = $blog->created_at->diffForHumans();

        unset($blog->user_id, $blog->user);

        return response()->json($blog);
    }
}
