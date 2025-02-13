import {useForm} from "@inertiajs/react";
import * as React from "react";
import {FormEventHandler} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu";
import {PlusIcon} from "lucide-react";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/Components/ui/dialog";
import InputError from "@/Components/InputError";
import {Button} from "@/Components/ui/button";
import {Course} from "@/types";

interface SectionFormData {
  title: string;
  course_id: number | string | null;
  order: string | number;

  [key: string]: any;
}

interface Props {
  course: Course;
}

const CreateSectionForm = ({course}: Props) => {
  const {data, setData, post, processing, reset, errors} = useForm<SectionFormData>({
    title: '',
    course_id: course.id,
    order: '',
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("submit", data);
    post(route('sections.store'), {
      onSuccess: () => {
        reset();
        setIsOpen(false);
      }
    });
  };


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={'rounded-sm bg-white shadow-sm px-1'}>
          <PlusIcon/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className={"cursor-pointer"} onClick={() => setIsOpen(true)}>
            Créer une section
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau cours ?</DialogTitle>
            <div className="flex-col flex justify-center">
              <form onSubmit={submit} className="flex flex-col gap-2">
                <input
                  type="number"
                  placeholder="Numéro de section"
                  value={data.order}
                  onChange={e => setData('order', +e.target.value)}
                  className={"block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"}
                />
                <input
                  value={data.title}
                  placeholder="Titre de la section"
                  onChange={e => setData('title', e.target.value)}
                  className={"block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"}
                />
                <InputError message={errors.title} className="mt-2"/>
                <Button type={"submit"} className="mt-4">Save</Button>
              </form>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start flex flex-col gap-6">
            <DialogClose asChild>
              <Button type={"button"} variant={"secondary"} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateSectionForm;
