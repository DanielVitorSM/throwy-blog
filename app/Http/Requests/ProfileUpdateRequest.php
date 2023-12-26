<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Rules\Slug;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $id = auth()->id();

        return [
            'name' => ['string', 'max:255'],
            'email' => ['email', 'max:255', "unique:users,email,{$id}"],
            'slug' => ['string', 'max:255', new Slug, "unique:users,email,{$id}"],
            'avatar' => ['file', 'max:4096', 'mimes:png,jpeg,jpg'],
            'description' => ['string', 'max:255']
        ];
    }
}
