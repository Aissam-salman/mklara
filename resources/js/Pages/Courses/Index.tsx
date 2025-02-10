import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Input} from "@/Components/ui/input";
import {FormEventHandler, useState} from "react";
import * as React from "react";


interface FormData {
  title: string;
  description: string;
  image: File | string | null;

  [key: string]: any;
}

export default function Index() {
  const {data, setData, post, processing, reset, errors} = useForm<FormData>({
    title: '',
    description: '',
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string>()


  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("submit", data);
    return
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
      <Head title="Courses"/>
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input
            value={data.title}
            placeholder="Titre du cours"
            onChange={e => setData('title', e.target.value)}
            className={"block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"}
          />
          <InputError message={errors.title} className="mt-2"/>
          <textarea
            value={data.description}
            placeholder="What's on your mind?"
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
