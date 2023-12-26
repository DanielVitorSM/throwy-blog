<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\PostTag;
use App\Models\Tag;
use App\Rules\Slug;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display the post list.
     */
    public function index(Request $request): Response
    {
        $request->validate([
            'sortBy' => 'nullable|string',
            'active' => 'nullable|string|in:true,false',
            'descending' => 'nullable|string:true,false',
            'rowsPerPage' => 'nullable|numeric|min:5|max:50'
        ]);

        $sortBy = $request->input('sortBy', 'created_at');
        $descending = $request->input('descending', true) == 'true';
        $active = $request->input('active', true) == 'true';
        $rowsPerPage = (int) $request->input('rowsPerPage', 10);

        $query = Post::query()
            ->withCount('views')
            ->withBasic()
            ->orderBy($sortBy, $descending ? 'DESC' : 'ASC');

        if ($active)
            $query->withoutTrashed();
        else
            $query->onlyTrashed();

        $posts = $query->paginate($rowsPerPage);
        $posts->makeVisible('deleted_at');

        return Inertia::render('Manager/Posts', [
            'posts' => $posts->items(),
            'active' => $active,
            'pagination' => [
                'sortBy' => $sortBy,
                'descending' => $descending,
                'rowsPerPage' => $rowsPerPage,
                'rowsNumber' => $posts->total(),
                'page' => $posts->currentPage(),
            ]
        ]);
    }

    /**
     * Display the post create form.
     */
    public function create(): Response
    {
        return Inertia::render('Manager/Post', [
            'categories' => Category::query()->forSelect()->get()
        ]);
    }

    /**
     * Stores a new post.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(Post::$rules);

        $validated['author_id'] = auth()->id();
        $post = Post::create($validated);

        if (!empty($validated['tags'])) {
            foreach ($validated['tags'] as $tag) {
                $slug = Str::slug($tag, '-', 'pt');
                $tagModel = Tag::query()->where('slug', $slug)->orWhere('name', $tag)->select('id')->first();

                if (!empty($tagModel)) {
                    PostTag::create(['post_id' => $post->id, 'tag_id' => $tagModel->id]);
                } else {
                    $post->tags()->create([
                        'name' => $tag,
                        'slug' => $slug
                    ]);
                }
            }

        }

        $response = Redirect::route('posts.index');

        return $response->with('success', 'Post criado com sucesso');
    }

    /**
     * Display the post edit form.
     */
    public function edit(string $id): Response
    {
        return Inertia::render('Manager/Post', [
            'post' => Post::withTrashed()->withBasic()->find($id)->makeVisible('deleted_at'),
            'categories' => Category::query()->forSelect()->get()
        ]);
    }

    /**
     * Updates an existing post.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $validated = $request->validate(array_merge(Post::$rules, [
            'slug' => ['nullable', 'string', "unique:posts,slug,{$id}", 'max:255', new Slug]
        ]));

        $post = Post::withTrashed()->find($id);

        if (empty($post))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        $post->fill($validated);
        $post->save();

        PostTag::query()->where('post_id', $post->id)->delete();
        if (!empty($validated['tags'])) {
            foreach ($validated['tags'] as $tag) {
                $slug = Str::slug($tag, '-', 'pt');
                $tagModel = Tag::query()->where('slug', $slug)->orWhere('name', $tag)->select('id')->first();

                if (empty($tagModel)) {
                    $tagModel = Tag::create([
                        'name' => $tag,
                        'slug' => $slug
                    ]);
                }

                PostTag::create(['post_id' => $post->id, 'tag_id' => $tagModel->id]);
            }
        }

        if ($request->hasHeader('X-Reload'))
            $response = back();
        else
            $response = Redirect::route('posts.index');

        return $response->with('success', 'Post atualizado com sucesso');
    }

    /**
     * Restore a deleted post by id.
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        $post = Post::onlyTrashed()->find($id);

        if (empty($post))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        $post->restore();

        if ($request->hasHeader('X-Reload'))
            $response = back();
        else
            $response = Redirect::route('posts.index');

        return $response->with('success', 'Post restaurado com sucesso');
    }

    /**
     * Destroys a post by id.
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        $post = Post::withTrashed()->find($id);

        if (empty($post))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        if (empty($post->deleted_at))
            $post->delete();
        else
            $post->forceDelete();

        if ($request->hasHeader('X-Reload'))
            $response = back();
        else
            $response = Redirect::route('posts.index');

        return $response->with('success', 'Post removido com sucesso');
    }
}
