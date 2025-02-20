<?php

namespace App\Http\Controllers;

use App\Events\GroupMessageSent;
use App\Models\Group;
use App\Models\GroupMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class GroupMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Group $group)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $message = $group->messages()->create([
            'user_id' => auth()->id(),
            'content' => $request->content(),
        ]);

        broadcast(new GroupMessageSent($message))->toOthers();

        return redirect()->back()->with('success', 'message created');
    }

    /**
     * Display the specified resource.
     */
    public function show(GroupMessage $groupMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GroupMessage $groupMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GroupMessage $groupMessage)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        try {
            $groupMessage->update($validated);
            return redirect()->back()->with('success', 'Message updated!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupMessage $groupMessage)
    {
        Gate::authorize('delete', $groupMessage);

        $groupMessage->delete();
        return redirect()->back()->with('success', 'Message supprimé avec succès');
    }
}
