import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Input} from "@/Components/ui/input";
import {FormEventHandler, useState} from "react";
import * as React from "react";
import { Course } from "@/types";
import CourseComponent from "@/Components/CourseComponent";

interface FormData {
  title: string;
  description: string;
  image: File | string | null;
  order: string;
  [key: string]: any;
}
export default function Create() {
  const {data, setData, post, processing, reset, errors} = useForm<FormData>({
    title: '',
    description: '',
    image: null,
    order: '',
  });

  const [previewImage, setPreviewImage] = useState<string>()


  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("submit", data);
    post(route('courses.store'), {onSuccess: () => reset()});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target?.files[0];
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <AuthenticatedLayout>
      <Head title="Créer un cours"/>
      <h2 className={"text-2xl font-bold text-center text-gray-800"}>
        Créer un nouveau cours
      </h2>
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="Numéro de cours"
            onChange={e => setData('order', e.target.value)}
            className={"block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"}
          />
          <input
            value={data.title}
            placeholder="Titre du cours"
            onChange={e => setData('title', e.target.value)}
            className={"block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"}
          />
          <InputError message={errors.title} className="mt-2"/>
          <textarea
            value={data.description}
            placeholder="Description du cours"
            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            onChange={e => setData('description', e.target.value)}
          ></textarea>
          <InputError message={errors.description} className="mt-2"/>
          <input placeholder={"Illustration"} type="file" onChange={(e) => handleImageChange(e)}/>
          <img src={previewImage} className={previewImage ? "w-full h-52" : "hidden"} alt={''}/>
          <InputError message={errors.image} className="mt-2"/>
          <PrimaryButton className="mt-4" disabled={processing}>Enregistrer</PrimaryButton>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
