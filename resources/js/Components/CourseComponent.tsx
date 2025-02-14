import {Course} from "@/types";
import {Card} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import {Link, router, useForm, usePage} from "@inertiajs/react";
import * as React from "react";
import {FormEventHandler, useState} from "react";
import InputError from "@/Components/InputError";
import {Button} from "@/Components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/Components/ui/dialog";
import {Ellipsis} from "lucide-react";

interface CourseComponentProps {
  course: Course;
}

export default function CourseComponent({course}: CourseComponentProps) {

  const user = usePage().props.auth.user;

  const [previewImage, setPreviewImage] = useState<string>(course.image)
  const {data, setData, post, clearErrors, reset, errors} = useForm({
    title: course.title,
    description: course.description,
    image: course.image,
    order: course.order,
  });

  const [isOpen, setIsOpen] = React.useState(false);

  // @ts-ignore
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(data)
    post(route('courses.update', course.id), {
        forceFormData: true,
        onSuccess: () => setIsOpen(false)
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target?.files[0];
      // @ts-ignore
      setData('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDelete = () => {
    router.delete(route('courses.destroy', course.id));
  }


  const truncatedDescription = course.description.length > 100
    ? course.description.slice(0, 100) + "..."
    : course.description;
  return (
    <Card className="p-6 bg-white flex flex-wrap gap-6 w-full relative max-w-3xl">
      <div>
        <Link href={route('courses.show', course.id)} className="flex flex-wrap sm:flex-nowrap gap-6 cursor-pointer">
          <img className="rounded-sm h-36" src={course.image} alt=""/>
          <div>
            <small className="mr-2 text-sm font-semibold text-gray-600">{course.order} -</small>
            <span className="text-xl font-bold text-gray-800">{course.title}</span>
            <p className="mt-4 text-lg text-gray-900 max-w-2xl">{truncatedDescription}</p>
          </div>
        </Link>

      </div>

      <div className="absolute bottom-0 right-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis/>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={"left"}>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setIsOpen(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="text-red-300 cursor-pointer bg-red-50" onClick={handleDelete}>
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editer le cours?</DialogTitle>
            <div className="flex items-center space-x-2">
              <form onSubmit={submit} className="flex flex-col gap-2">
                <input
                  type="number"
                  placeholder="Numéro de cours"
                  value={data.order}
                  onChange={e => setData('order', +e.target.value)}
                  className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
                <input
                  value={data.title}
                  placeholder="Titre du cours"
                  onChange={e => setData('title', e.target.value)}
                  className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
                <InputError message={errors.title} className="mt-2"/>
                <textarea
                  value={data.description}
                  placeholder="Description du cours"
                  className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                  onChange={e => setData('description', e.target.value)}
                ></textarea>
                <InputError message={errors.description} className="mt-2"/>
                <input name="image" placeholder="Illustration" type="file" onChange={handleImageChange}/>
                <img src={previewImage} className={previewImage ? "w-full h-52" : "hidden"} alt=""/>
                <InputError message={errors.image} className="mt-2"/>
                <Button type="submit" className="mt-4">Save</Button>
              </form>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start flex flex-col gap-6">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
