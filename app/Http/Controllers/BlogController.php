<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostView;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Display the post page by slug.
     */
    public function show(Request $request, string $slug): Response
    {
        $user = auth()->user();
        $query = Post::query();

        if (empty($user))
            $query->published();
        else if ($user->role === 'manager')
            $query->withTrashed();

        $post = $query->withBasic()
            ->where('slug', $slug)
            ->first();

        if (empty($post))
            abort(404);

        $user = auth()->user();
        $userIsGuest = !empty($user) ? $user->role != 'manager' : true;
        $ip = $request->getClientIp();
        $agent = $request->header('User-Agent');
        $cookieHas = PostView::query()->where('ip', $ip)->where('created_at', '<=', now()->subHours(4))->exists();

        if (!$cookieHas && $userIsGuest) {
            $post->views()->create([
                'ip' => $ip,
                'agent' => $agent
            ]);
        }

        return Inertia::render('Post', [
            'post' => $post,
            'similarPosts' => Post::query()->similar($post)->withBasic()->take(3)->get(),
        ]);
    }
}
