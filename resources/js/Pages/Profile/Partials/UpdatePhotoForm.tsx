// @flow
import * as React from 'react';
import { useForm, usePage} from "@inertiajs/react";
import { FormEventHandler, useState} from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import {Input} from "@/Components/ui/input";
import {EditIcon} from "lucide-react";

interface FormData {
    profile_photo_path: File | string | null;
    [key: string]: any;
}
export const UpdatePhotoForm = ({className = ''}: { className: string }) => {
    const user = usePage().props.auth.user;

    const {data, setData, post, errors, processing, recentlySuccessful} =
        useForm<FormData>({
            profile_photo_path: null,
        });

    const [profileImage, setProfileImage] = useState<string>(user.profile_photo_path ?? "/images/default-avatar.png");

    // @ts-ignore
    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        setData("profile_photo_path", file);
    }
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

      console.log(data.profile_photo_path);

        if (!data.profile_photo_path) {
            alert("Please select a profile photo.");
            return;
        }
        post(route('profile.photo.update'), {
                method: 'put'
            }
        );
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile avatar
                </h2>
                <p className="mt-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile avatar here.
                </p>
                <div
                    className=""
                >
                    <Avatar onClick={() => document.getElementById("fileInput")?.click()}
                            className={"relative cursor-pointer group h-32 w-32 overflow-hidden"}
                    >
                        <AvatarImage src={profileImage}/>
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                        <span className="text-white text-sm font-medium">
                            <EditIcon/>
                        </span>
                        </div>
                    </Avatar>
                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Input
                        id={"fileInput"}
                        type="file"
                        accept="image/*"
                        className={"hidden"}
                        onChange={handleChangeFile}
                    />
                    <InputError className="mt-2" message={errors.profile_photo_path}/>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
};
