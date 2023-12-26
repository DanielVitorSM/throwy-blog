<?php

namespace App\Http\Controllers;

use App\Helpers\JsonPattern;
use App\Models\Tag;
use App\Rules\Slug;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    /**
     * Display the tag list.
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

        $query = Tag::query()
            ->withCount('posts')
            ->orderBy($sortBy, $descending ? 'DESC' : 'ASC');

        $tags = $query->paginate($rowsPerPage);

        return Inertia::render('Manager/Tags', [
            'tags' => $tags->items(),
            'pagination' => [
                'sortBy' => $sortBy,
                'descending' => $descending,
                'rowsPerPage' => $rowsPerPage,
                'rowsNumber' => $tags->total(),
                'page' => $tags->currentPage(),
            ]
        ]);
    }

    /**
     * Shows data from a tag.
     */
    public function show(Request $request, string $id): JsonResponse|RedirectResponse
    {
        $tag = Tag::find($id);

        if (empty($tag))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        if ($request->wantsJson())
            return JsonPattern::data($tag);

        return Redirect::route('tags.index');
    }

    /**
     * Stores a new tag.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => ['nullable', 'string', "unique:tags,slug", 'max:255', new Slug],
        ]);

        Tag::create($validated);

        if ($request->hasHeader('X-Reload'))
            return back();

        return Redirect::route('tags.index');
    }


    /**
     * Updates an existing tag.
     */
    public function update(Request $request, string $id): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'slug' => ['nullable', 'string', "unique:tags,slug,{$id}", 'max:255', new Slug],
        ]);

        $tag = Tag::find($id);

        if (empty($tag))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        $tag->fill($validated);
        $tag->save();

        if ($request->hasHeader('X-Reload'))
            return back();

        return Redirect::route('tags.index');
    }

    /**
     * Destroy an existing tag.
     */
    public function destroy(Request $request, string $id): JsonResponse|RedirectResponse
    {
        $tag = Tag::find($id);
        
        if (empty($tag))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);
        
        $tag->delete();
        
        if ($request->hasHeader('X-Reload'))
            return back();

        if ($request->wantsJson())
            return JsonPattern::data(null, 'Tag removida com sucesso');

        return Redirect::route('tags.index');
    }
}
