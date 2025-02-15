<?php

namespace App\Http\Controllers;

use App\Http\Services\AppwriteStorageService;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class GroupController extends Controller
{
    protected $storageService;
    public function __construct(AppwriteStorageService $storageService){
        $this->storageService = $storageService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = Group::with('members')->get();

        return Inertia::render('Groups/Index', [ 'groups'=> $groups ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Groups/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name"=> "required|string",
            "description"=> "nullable|string",
            "photo_url"=> "nullable|image|mimes:jpeg,png,jpg,gif,svg,webp",
        ]);


        if ($request->hasFile('photo_url')) {
            $validated['photo_url'] = $this->storageService->uploadImage($request->file('photo_url'));
        }

        $group = Group::create($validated);
        return redirect()->route('groups.index')->with('success','group created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        $group->load('members.user','messages.user');
        return Inertia::render('Groups/Show', [ 'group'=> $group ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Group $group)
    {
        return Inertia::render('Groups/Edit', [
            'group' => $group
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $group)
    {
        Gate::authorize('update', $group);

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'description' => 'string',
            'photo_url' => [
                'nullable',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->hasFile('photo_url')) {
                        $validator = Validator::make(
                            ['photo_url' => $request->file('photo_url')],
                            ['photo_url' => 'file|mimes:jpeg,png,jpg,gif,svg,webp']
                        );

                        if ($validator->fails()) {
                            $fail($validator->errors()->first('photo_url'));
                        }
                    } else if ($value) {
                        $validator = Validator::make(
                            ['photo_url' => $value],
                            ['photo_url' => 'string|url']
                        );

                        if ($validator->fails()) {
                            $fail($validator->errors()->first('photo_url'));
                        }
                    }
                }
            ],
        ]);

        $validated = $validator->validate();

        $dataToUpdate = [];

        if ($request->has('name') && $request->name !== $group->name) {
            $dataToUpdate['name'] = $validated['name'];
        }
        if ($request->has('description') && $request->description !== $group->description) {
            $dataToUpdate['description'] = $validated['description'];
        }

        if ($request->hasFile('photo_url')) {
            try {
                if ($group->photo_url) {
                    $this->storageService->deleteImage($group->photo_url);
                }

                $dataToUpdate['photo_url'] = $this->storageService->uploadImage($request->file('photo_url'));
            } catch (\Exception $e) {
                return redirect()
                    ->route('groups.index')
                    ->with('error', 'Erreur lors de l\'upload de l\'image: ' . $e->getMessage());
            }
        }

        try {
            $res = $group->update($dataToUpdate);
            return redirect()
                ->route('groups.index')
                ->with('success', 'Groupe mis à jour avec succès');
        } catch (\Exception $e) {
            return redirect()
                ->route('groups.index')
                ->with('error', 'Erreur lors de la mise à jour du groupe: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        Gate::authorize('delete', $group);
        $group->delete();
        return redirect()->route('groups.index')->with('success','group deleted!');
    }
}
