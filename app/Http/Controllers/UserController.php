<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\PostTag;
use App\Models\Tag;
use App\Models\User;
use App\Rules\Slug;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display the user list.
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

        $query = User::query()
            ->orderBy($sortBy, $descending ? 'DESC' : 'ASC');

        if ($active)
            $query->withoutTrashed();
        else
            $query->onlyTrashed();

        $users = $query->paginate($rowsPerPage);
        $users->makeVisible(['deleted_at', 'last_login_at']);

        return Inertia::render('Manager/Users', [
            'users' => $users->items(),
            'active' => $active,
            'pagination' => [
                'sortBy' => $sortBy,
                'descending' => $descending,
                'rowsPerPage' => $rowsPerPage,
                'rowsNumber' => $users->total(),
                'page' => $users->currentPage(),
            ],
            'roles' => User::$roles
        ]);
    }

    /**
     * Display the user create form.
     */
    public function create(): Response
    {
        return Inertia::render('Manager/User', [
            'roles' => User::$roles
        ]);
    }

    /**
     * Stores a new user.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => ['nullable', 'string', 'max:255', 'unique:users,slug', new Slug],
            'role' => 'required|string|in:' . join(',', array_keys(User::$roles)),
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|max:255|confirmed',
            'avatar' => 'nullable|file|max:4096|mimes:jpg,jpeg,png',
            'description' => 'nullable|string|max:255'
        ]);

        User::create($validated);

        $response = Redirect::route('users.index');

        return $response->with('success', 'Usuário criado com sucesso');
    }

    /**
     * Display the user edit form.
     */
    public function edit(string $id): Response
    {
        return Inertia::render('Manager/User', [
            'user' => User::withTrashed()->find($id)->makeVisible(['deleted_at', 'last_login_at']),
            'roles' => User::$roles
        ]);
    }

    /**
     * Updates an existing post.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => ['string', 'max:255', "unique:users,slug,{$id}", new Slug],
            'role' => 'string|in:' . join(',', array_keys(User::$roles)),
            'name' => 'string|max:255',
            'email' => "email|max:255|unique:users,email,{$id}",
            'password' => 'nullable|string|max:255|confirmed',
            'avatar' => 'nullable|file|max:4096|mimes:jpg,jpeg,png',
            'description' => 'nullable|string|max:255'
        ]);

        $user = User::withTrashed()->find($id);

        if (empty($user))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        $user->fill($validated);
        $user->save();

        if ($request->hasHeader('X-Reload'))
            $response = back();
        else
            $response = Redirect::route('users.index');

        return $response->with('success', 'Usuário atualizado com sucesso');
    }

    /**
     * Restore a deleted user by id.
     */
    public function restore(Request $request, string $id): RedirectResponse
    {
        $user = User::onlyTrashed()->find($id);

        if (empty($user))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        $user->restore();

        if ($request->hasHeader('X-Reload'))
            $response = back();
        else
            $response = Redirect::route('users.index');

        return $response->with('success', 'Usuário restaurado com sucesso');
    }

    /**
     * Destroys a user by id.
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        $user = User::withTrashed()->find($id);

        if (empty($user))
            throw ValidationException::withMessages(['O campo id selecionado é inválido']);

        if (empty($user->deleted_at))
            $user->delete();
        else
            $user->forceDelete();

        if ($request->hasHeader('X-Reload'))
            $response = back();
        else
            $response = Redirect::route('users.index');

        return $response->with('success', 'Usuário removido com sucesso');
    }
}
