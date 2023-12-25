<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function show(Request $request): Response
    {
        $request->validate([
            'orderBy' => "nullable|in:popular,recent"
        ]);

        $orderBy = $request->input('orderBy', 'recent');

        $query = Post::with(['category', 'tags', 'author'])->take(20);

        switch ($orderBy) {
            case 'popular':
                $query->popular();
                break;
            
            case 'recent':
                $query->recent();
                break;
        }

        return Inertia::render('Home', [
            'posts' => $query->get(),
            'categories' => Category::query()->popular()->take(7)->get(),
            'tags' => Tag::query()->popular()->take(7)->get(),
            'orderBy' => $orderBy
        ]);
    }
    
    /**
     * Display the dashboard page.
     */
    public function dashboard(Request $request): Response
    {
        return Inertia::render('Dashboard');
    }
}
