<?php

namespace App\Http\Services;

use Appwrite\Client;
use Appwrite\Services\Storage;
use Appwrite\ID;
use Appwrite\InputFile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class AppwriteStorageService {
    private $storage;

    public function __construct() {
        $client = new Client();
        $client->setEndpoint(env('APPWRITE_ENDPOINT'))
                ->setProject(env('APPWRITE_PROJECT_ID'))
                ->setKey(env('APPWRITE_API_KEY'));

        $this->storage = new Storage($client);
    }

    /**
     * Téléverse un fichier image dans le stockage Appwrite
     *
     * @param UploadedFile $file Le fichier image à téléverser
     * @return string|null L'URL publique de l'image téléversée ou null en cas d'échec
     *
     * @example
     * $url = $storageService->uploadImage($request->file('image'));
     * // Retourne : 'https://cloud.appwrite.io/v1/storage/buckets/bucket_id/files/file_id/view?project=project_id'
     */
    public function uploadImage(UploadedFile $file): ?string
    {

        $fileId = ID::unique();

        $this->storage->createFile(
            bucketId: env('APPWRITE_STORAGE_BUCKET_ID'),
            fileId: $fileId,
            file: InputFile::withPath($file->getPathname())
        );

        return sprintf(
            'https://cloud.appwrite.io/v1/storage/buckets/%s/files/%s/view?project=%s',
            env('APPWRITE_STORAGE_BUCKET_ID'),
            $fileId,
            env('APPWRITE_PROJECT_ID')
        );
    }

    public function deleteImage(string $imageUrl): void
    {
        $fileId = Str::before(Str::after($imageUrl, 'files/'), '/view');
        $this->storage->deleteFile(
            bucketId: env('APPWRITE_STORAGE_BUCKET_ID'),
            fileId: $fileId
        );
    }
}