<?php

namespace App\Http\Controllers;

use App\Helpers\Meta;
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
            'search' => "nullable|string",
            'sortBy' => 'nullable|string|in:popular,recent',
            'descending' => 'nullable|string:true,false',
            'rowsPerPage' => 'nullable|numeric|min:5|max:50'
        ]);

        $sortBy = $request->input('sortBy', 'popular');
        $descending = $request->input('descending', true) == true;
        $rowsPerPage = $request->input('rowsPerPage', 20);
        $search = $request->input('search');

        $query = Post::withBasic()->published();

        if (!empty($search)) {
            $query->where(fn ($q) => 
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('slug', 'LIKE', "%{$search}%")
                    ->orWhere('caption', 'LIKE', "%{$search}%")
                    ->orWhereHas('category', fn ($q) => $q->where('categories.name', 'LIKE', "%{$search}%"))
                    ->orWhereHas('author', fn ($q) => $q->where('users.name', 'LIKE', "%{$search}%"))
                    ->orWhereHas('tags', fn ($q) => $q->where('tags.name', 'LIKE', "%{$search}%"))
            );
        }

        switch ($sortBy) {
            case 'popular':
                $query->popular();
                break;
            
            case 'recent':
                $query->recent();
                break;
        }

        $posts = $query->paginate(20);

        Meta::addMeta('description', 'Invista com inteligência e conquiste a independência financeira. Descubra como investir de forma inteligente e conquistar a liberdade financeira que você sempre sonhou.');

        return Inertia::render('Home', [
            'posts' => $posts->items(),
            'pagination' => [
                'sortBy' => $sortBy,
                'descending' => $descending,
                'rowsPerPage' => $rowsPerPage,
                'rowsNumber' => $posts->total(),
                'page' => $posts->currentPage(),
            ],
            'categories' => Category::query()->popular()->take(7)->get(),
            'tags' => Tag::query()->popular()->take(7)->get(),
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
