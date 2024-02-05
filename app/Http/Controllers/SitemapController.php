<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class SitemapController extends Controller
{
    /**
     * Display the entire sitemap.
     */
    public function index(Request $request): Response
    {
        $sitemap = App::make('sitemap');
        $sitemap->setCache('laravel.sitemap', 60);

        if (!$sitemap->isCached()) {
            $sitemap->add(URL::to('/'), '2024-02-05T20:10:00+02:00', '1.0', 'daily');
            $sitemap->add(URL::to('/tools/calculadora-de-juros-compostos'), '2024-02-05T20:10:00+02:00', '0.9', 'monthly');

            $posts = Post::query()->orderBy('published_at', 'DESC')->where('published', true)->get();

            foreach ($posts as $post) {
                $sitemap->add(URL::to("/blog/{$post->slug}"), $post->updated_at, '0.8', 'monthly');
            }
        }

        return $sitemap->render('xml');
    }
}
