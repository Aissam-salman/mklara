import { Card } from "@/Components/ui/card";
import { Section } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import * as React from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Link, router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface SectionComponentProps {
  section: Section;
  key: number | string;
}
const SectionComponent = ({ section }: SectionComponentProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { data, setData, patch, clearErrors, reset, errors } = useForm({
    title: section.title,
    order: section.order,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(data);
    patch(route('sections.update', section.id), {
      onSuccess: () => {
        setIsOpen(false);
      },
      onError: () => {
        console.log("Error");
      }
    });
  }

  const handleDelete = () => {
    router.delete(route('sections.destroy', section.id));
  }


  return (
    <>
      <Card className="w-full max-w-md p-5 flex items-center justify-start gap-8" >
        <Link className="flex items-center gap-2" href={route('sections.show', section.id)}>
          <div className=" text-2xl font-medium">{section.order}{" "}</div>
          <h3 className="text-2xl font-bold">{section.title}</h3>
        </Link>
        <div className={"ml-auto"}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsOpen(true)} className={"cursor-pointer"}>
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-red-300 cursor-pointer bg-red-50" >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editer la section?</DialogTitle>
            <div className="flex items-center space-x-2">
              <form onSubmit={submit} className="flex flex-col gap-2">
                <input
                  type="number"
                  placeholder="Numéro de section"
                  value={data.order}
                  onChange={e => setData('order', +e.target.value)}
                  className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
                <input
                  value={data.title}
                  placeholder="Titre de section"
                  onChange={e => setData('title', e.target.value)}
                  className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
                <InputError message={errors.title} className="mt-2" />
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
    </>
  )
}

export default SectionComponent;
