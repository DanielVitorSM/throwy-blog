<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Prepare exception for rendering.
     *
     * @param  \Throwable  $e
     * @return Response
     */
    public function render($request, Throwable $e)
    {
        $route = Route::current();
        $response = parent::render($request, $e);
        $type = in_array('auth', $route ? $route->gatherMiddleware() : []) ? 'manager' : 'guest';
        $status = $response->getStatusCode();

        if (!app()->environment(['testing']) && in_array($status, [404, 403, 500])) {
            return Inertia::render('Error', ['status' => $status, 'type' => $type])
                ->toResponse($request)
                ->setStatusCode($status);
        }

        return $response;
    }
}
