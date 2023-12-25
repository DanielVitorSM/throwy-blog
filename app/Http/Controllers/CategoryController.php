<?php

namespace App\Http\Controllers;

use App\Helpers\JsonPattern;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Rules\Slug;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display the category list.
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

        $query = Category::query()
            ->withCount('posts')
            ->orderBy($sortBy, $descending ? 'DESC' : 'ASC');

        if ($active)
            $query->withoutTrashed();
        else
            $query->onlyTrashed();

        $categories = $query->paginate($rowsPerPage);
        $categories->makeVisible('deleted_at');

        return Inertia::render('Manager/Categories', [
            'categories' => $categories->items(),
            'active' => $active,
            'pagination' => [
                'sortBy' => $sortBy,
                'descending' => $descending,
                'rowsPerPage' => $rowsPerPage,
                'rowsNumber' => $categories->total(),
                'page' => $categories->currentPage(),
            ]
        ]);
    }

    /**
     * Shows data from a category.
     */
    public function show(Request $request, string $id): JsonResponse|RedirectResponse
    {
        $category = Category::withTrashed()->find($id);

        if (empty($category))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        if ($request->wantsJson())
            return JsonPattern::data($category);

        return Redirect::route('categories.index');
    }

    /**
     * Stores a new category.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => ['nullable', 'string', "unique:categories,slug", 'max:255', new Slug],
        ]);

        Category::create($validated);

        if ($request->hasHeader('X-Reload'))
            return back();

        return Redirect::route('categories.index');
    }

    /**
     * Updates an existing category.
     */
    public function update(Request $request, string $id): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'slug' => ['nullable', 'string', "unique:categories,slug,{$id}", 'max:255', new Slug],
        ]);

        $category = Category::withTrashed()->find($id);

        if (empty($category))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        $category->fill($validated);
        $category->save();

        if ($request->hasHeader('X-Reload'))
            return back();

        return Redirect::route('posts.index');
    }

    /**
     * Restore a deleted category by id.
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        $category = Category::onlyTrashed()->find($id);

        if (empty($category))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        $category->restore();

        if ($request->hasHeader('X-Reload'))
            $response = back();
        else
            $response = Redirect::route('categories.index');

        return $response->with('success', 'Categoria restaurada com sucesso');
    }

    /**
     * Destroy an existing category.
     */
    public function destroy(Request $request, string $id): JsonResponse|RedirectResponse
    {
        $category = Category::withTrashed()->find($id);
        
        if (empty($category))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);
        
        if (empty($category->deleted_at))
            $category->delete();
        else
            $category->forceDelete();

        if ($request->hasHeader('X-Reload'))
            return back();

        if ($request->wantsJson())
            return JsonPattern::data(null, 'Categoria removida com sucesso');

        return Redirect::route('categories.index');
    }
}
