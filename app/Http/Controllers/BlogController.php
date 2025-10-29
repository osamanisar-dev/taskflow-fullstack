<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index(){
        $blogs = auth()->user()
            ->blogs()
            ->select(['id','title','description','created_at'])
            ->latest()
            ->get()
            ->map(function($blog) {
                $blog->created_ago = $blog->created_at->diffForHumans();
                return $blog;
            });
        return response()->json($blogs);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        $filePath = $request->file('image')->store('blogs', 'public');
        $fileName = basename($filePath);

        $blog = auth()->user()->blogs()->create([
            'title' => $request->title,
            'description'=> $request->description,
            'image_path'=> $fileName
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Blog created successfully!',
            'data' => [
                'id'=>$blog->id,
                'title' => $blog->title,
                'description' => $blog->description,
                'date' =>  $blog->created_at->diffForHumans(),
            ],
        ]);
    }

    public function update(Blog $blog, Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $blog->update($validated);
        return response()->json([
            'status' => 'success',
            'message' => 'Blog updated successfully!',
            'data' => [
                'id'=>$blog->id,
                'title' => $blog->title,
                'description' => $blog->description,
                'date' =>  $blog->created_at->diffForHumans(),
            ],
        ]);

    }

    public function destroy(Blog $blog)
    {
        $imagePath = 'blogs/'.$blog->image_path;
        if (Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }
        $blog->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Blog deleted successfully!',
        ]);
    }

}
