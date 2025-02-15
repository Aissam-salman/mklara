import InputError from '@/Components/InputError.js';
import PrimaryButton from '@/Components/PrimaryButton.js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.js';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';

interface FormData {
  name: string;
  description: string;
  photo_url: File | string | null;
  [key: string]: any;
}

interface EditGroupProps {
    group: {
        id: number;
        name: string;
        description: string;
        photo_url: string;
    };
}

export default function GroupsEdit({ group }: EditGroupProps) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: group.name,
        description: group.description,
        photo_url: group.photo_url,
    });

    const [previewImage, setPreviewImage] = useState<string>(group.photo_url)

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('groups.update', group.id), {
            forceFormData: true,
            onSuccess: () => {
                console.log('success')
            },
            onError: (err) => {
                console.error('erreur update:', err)
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target?.files[0];
            setData('photo_url', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Modifier le groupe" />
            <h2 className={"text-2xl font-bold text-center text-gray-800"}>
                Modifier le groupe
            </h2>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} className="flex flex-col gap-2">
                    <input
                        value={data.name}
                        placeholder="Nom du groupe"
                        onChange={e => setData('name', e.target.value)}
                        className={"block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"}
                    />
                    <InputError message={errors.name} className="mt-2" />
                    <textarea
                        value={data.description}
                        placeholder="Description du groupe"
                        rows={15}
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('description', e.target.value)}
                    ></textarea>
                    <InputError message={errors.description} className="mt-2" />

                    <input placeholder={"Illustration"} type="file" onChange={(e) => handleImageChange(e)} />
                    <img src={previewImage} className={previewImage ? "w-full h-52" : "hidden"} alt={''} />
                    <InputError message={errors.photo_url} className="mt-2" />

                    <PrimaryButton className="mt-4" disabled={processing}>
                        Mettre à jour
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}