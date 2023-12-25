<?php

namespace App\Http\Controllers\Api;

use App\Helpers\JsonPattern;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Uploads archives on tmp folder
     */
    public function store(Request $request)
    {
        $request->validate([
            '*' => 'file|max:4096|mimes:png,jpg,jpeg'
        ]);
        
        /** @var UploadedFile */
        foreach ($request->allFiles() as $file) {
            $name = date('YmdHis-');
    
            if (!empty($file->getClientOriginalName()))
                $name .= Str::slug($file->getClientOriginalName(), '-', 'pt');
            else
                $name .= Str::uuid();
    
            $name .= ".{$file->getClientOriginalExtension()}";
    
            if (!Storage::has('tmp'))
                Storage::makeDirectory('tmp');

            $file->storePubliclyAs('tmp', $name);
        }

        return JsonPattern::data(null);
    }
}
