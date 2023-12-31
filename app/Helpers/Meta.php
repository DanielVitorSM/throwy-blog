<?php 

namespace App\Helpers;

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

        return $html;
    }
}