<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\InvokableRule;
use Illuminate\Support\Str;

class Slug implements InvokableRule
{
    
    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure  $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail)
    {
        $result = true;

        if (!is_string($value))
            $result = false;
        else    
            $result = $value == Str::slug($value, '-', 'pt');

        if (!$result)
            $fail('validation.slug')->translate();
    }
}
