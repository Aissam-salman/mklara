<?php

namespace App\Http\Controllers;

use Appwrite\AppwriteException;
use Appwrite\Client;
use Appwrite\ID;
use Appwrite\InputFile;
use Appwrite\Services\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProfilePhotoController extends Controller
{
    /**
     * @throws AppwriteException
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'profile_photo_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
        ]);

        $client = new Client();
        $client->setEndpoint(env('APPWRITE_ENDPOINT'))
            ->setProject(env('APPWRITE_PROJECT_ID'))
            ->setKey(env('APPWRITE_API_KEY'));

        $storage = new Storage($client);

        $file = $request->file('profile_photo_path');

        if(!$file) {
            return back()->with('error', 'File not uploaded');
        }

        $fileId = ID::unique();

         $storage->createFile(
           bucketId: env('APPWRITE_STORAGE_BUCKET_ID'),
            fileId: $fileId,
            file: InputFile::withPath($file->getPathname())
        );

        $fileUrl = sprintf(
            'https://cloud.appwrite.io/v1/storage/buckets/%s/files/%s/view?project=%s',
          env('APPWRITE_STORAGE_BUCKET_ID'),
            $fileId,
            env('APPWRITE_PROJECT_ID')
        );

        $request->user()->update(['profile_photo_path' => $fileUrl]);

        return back()->with('success', 'Photo mise à jour avec succès.');
    }
}
