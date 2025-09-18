<?php

namespace App\Http\Controllers;

use App\Models\MappingCoa;
use App\Models\MappingChannel;
use App\Models\MappingItem;
use App\Models\RulesTolerance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MasterController extends Controller
{
    /**
     * COA Mapping page
     */
    public function coa(): Response
    {
        $coaMappings = MappingCoa::where('is_active', true)
            ->orderBy('domain')
            ->orderBy('channel_code')
            ->get();

        return Inertia::render('master/coa', [
            'coaMappings' => $coaMappings,
        ]);
    }

    /**
     * Channel Mapping page
     */
    public function channels(): Response
    {
        $channelMappings = MappingChannel::where('status', 'active')
            ->orderBy('channel_code')
            ->get();

        return Inertia::render('master/channels', [
            'channelMappings' => $channelMappings,
        ]);
    }

    /**
     * Item Mapping page
     */
    public function items(): Response
    {
        $itemMappings = MappingItem::where('is_active', true)
            ->orderBy('item_code')
            ->paginate(50);

        return Inertia::render('master/items', [
            'itemMappings' => $itemMappings,
        ]);
    }

    /**
     * Bank Mapping page
     */
    public function banks(): Response
    {
        // For now, we'll use channel mappings for bank patterns
        $bankMappings = MappingChannel::orderBy('channel_code')->get();

        return Inertia::render('master/banks', [
            'bankMappings' => $bankMappings,
        ]);
    }

    /**
     * Tax Rules & Tolerance page
     */
    public function taxRules(): Response
    {
        $toleranceRules = RulesTolerance::where('is_active', true)
            ->orderBy('channel_code')
            ->get();

        return Inertia::render('master/tax-rules', [
            'toleranceRules' => $toleranceRules,
        ]);
    }

    /**
     * Update COA mapping
     */
    public function updateCoa(Request $request)
    {
        $request->validate([
            'domain' => 'required|string',
            'rule_key' => 'required|string',
            'account_code' => 'required|string',
            'channel_code' => 'nullable|string',
            'tax_code' => 'nullable|string',
        ]);

        MappingCoa::updateOrCreate(
            [
                'domain' => $request->domain,
                'rule_key' => $request->rule_key,
                'channel_code' => $request->channel_code,
            ],
            [
                'account_code' => $request->account_code,
                'tax_code' => $request->tax_code,
                'is_active' => true,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'COA mapping updated successfully',
        ]);
    }

    /**
     * Update channel mapping
     */
    public function updateChannel(Request $request)
    {
        $request->validate([
            'bank_description_pattern' => 'required|string',
            'channel_code' => 'required|string',
            'confidence' => 'required|integer|min:0|max:100',
        ]);

        MappingChannel::updateOrCreate(
            [
                'bank_description_pattern' => $request->bank_description_pattern,
            ],
            [
                'channel_code' => $request->channel_code,
                'confidence' => $request->confidence,
                'status' => 'active',
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Channel mapping updated successfully',
        ]);
    }

    /**
     * Update item mapping
     */
    public function updateItem(Request $request)
    {
        $request->validate([
            'source_name' => 'required|string',
            'item_code' => 'required|string',
            'uom' => 'nullable|string',
            'pattern' => 'nullable|string',
        ]);

        MappingItem::updateOrCreate(
            [
                'source_name' => $request->source_name,
            ],
            [
                'item_code' => $request->item_code,
                'uom' => $request->uom,
                'pattern' => $request->pattern,
                'is_active' => true,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Item mapping updated successfully',
        ]);
    }

    /**
     * Update tolerance rules
     */
    public function updateTolerance(Request $request)
    {
        $request->validate([
            'channel_code' => 'required|string',
            'date_lag_days' => 'required|integer|min:0|max:7',
            'amount_tolerance' => 'required|numeric|min:0',
            'percent_tolerance' => 'required|numeric|min:0|max:100',
        ]);

        RulesTolerance::updateOrCreate(
            [
                'channel_code' => $request->channel_code,
            ],
            [
                'date_lag_days' => $request->date_lag_days,
                'amount_tolerance' => $request->amount_tolerance,
                'percent_tolerance' => $request->percent_tolerance,
                'is_active' => true,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Tolerance rules updated successfully',
        ]);
    }
}
