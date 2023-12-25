<?php

namespace App\Http\Controllers;

use App\Helpers\JsonPattern;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Inertia\Response;

class TagController extends Controller
{
    /**
     * Returns a list of tags.
     */
    public function index(Request $request): JsonResponse|Response|RedirectResponse
    {
        $request->validate([
            'search' => 'nullable|string',
            'sortBy' => 'nullable|string',
            'descending' => 'nullable|string:true,false',
            'rowsPerPage' => 'nullable|numeric|min:5|max:50'
        ]);

        $sortBy = $request->input('sortBy', 'name');
        $descending = $request->input('descending', false) == 'true';
        $rowsPerPage = (int) $request->input('rowsPerPage', 10);
        $search = $request->input('search');

        $query = Tag::query()
            ->orderBy($sortBy, $descending ? 'DESC' : 'ASC');

        if (!empty($search))
            $query->where('name', 'LIKE', "%{$search}%")->orWhere('slug', 'LIKE', "%{$search}%");
        
        $tags = $query->paginate($rowsPerPage);

        if ($request->wantsJson())
            return JsonPattern::data($tags);

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
}
