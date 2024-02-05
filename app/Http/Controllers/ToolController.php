<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ToolController extends Controller
{
    /**
     * Display the Compound Interest Calculator's screen.
     */
    public function compoundInterestCalculator(Request $request): Response
    {
        return Inertia::render('Tools/CompoundInterest', $request->only([
            'initialValue',
            'monthlyValue',
            'feesTax',
            'feesTaxType',
            'period',
            'periodType',
            'ipcaType',
            'ipca',
            'irrf',
        ]));
    }
}
