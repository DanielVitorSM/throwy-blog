<?php 

namespace App\Helpers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class Meta
{
    protected static $meta = [];

    public static function addMeta($name, $content)
    {
        static::$meta[$name] = $content;
    }

    public static function cleanup()
    {
        static::$meta = [];
    }

    public static function render()
    {
        $html = '';
        foreach (static::$meta as $name => $content) {
            $html .= '<meta name="'.$name.'" content="'.$content.'" />'.PHP_EOL;
            
            if ($name === 'title') {
                $html .= '<meta name="og:title" content="'.$content.'" />'.PHP_EOL;
                $html .= '<meta name="twitter:title" content="'.$content.'" />'.PHP_EOL;
            } else if ($name === 'description') {
                $html .= '<meta name="og:description" content="'.$content.'" />'.PHP_EOL;
                $html .= '<meta name="twitter:description" content="'.$content.'" />'.PHP_EOL;
            }
        }

        if (Str::contains(Route::currentRouteName(), ['manager', 'profile']) || request()->is('login'))
            $html .= '<meta name="robots" content="noindex, nofollow" />'.PHP_EOL;
        else
            $html .= '<meta name="robots" content="all" />'.PHP_EOL;

        return $html;
    }
}