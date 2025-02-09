<?php

namespace App\Http\Controllers;

use Appwrite\AppwriteException;
use Appwrite\Client;
use Appwrite\ID;
use Appwrite\InputFile;
use Appwrite\Services\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use function Psy\debug;

class ProfilePhotoController extends Controller
{
    /**
     * @throws AppwriteException
     */
    public function update(Request $request): RedirectResponse
    {

        $request->validate([
            'profile_photo_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $client = new Client();
        $client->setEndpoint(env('APPWRITE_ENDPOINT'))
            ->setProject(env('APPWRITE_PROJECT_ID'))
            ->setKey(env('APPWRITE_API_KEY'));

        $storage = new Storage($client);

        $file = $request->file('profile_photo_path');

        if(!$file) {
            debug($request->file('profile_photo_path'));
            return back()->with('error', 'File not uploaded');
        }
        $bucketId = '679fa2e300062e7146b9';

        $fileId = ID::unique();

         $storage->createFile(
            bucketId: $bucketId,
            fileId: $fileId,
            file: InputFile::withPath($file->getPathname())
        );

        $fileUrl = sprintf(
            'https://cloud.appwrite.io/v1/storage/buckets/%s/files/%s/view?project=%s',
            $bucketId,
            $fileId,
            env('APPWRITE_PROJECT_ID')
        );

        $request->user()->update(['profile_photo_path' => $fileUrl]);

        return back()->with('success', 'Photo mise à jour avec succès.');
    }
}
