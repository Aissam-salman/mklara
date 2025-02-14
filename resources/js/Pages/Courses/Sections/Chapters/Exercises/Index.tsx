import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Plus, MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/InputError";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { router } from "@inertiajs/react";
import MarkdownComponent from "@/Components/MarkdownComponent.js";

interface Exercise {
    id: number;
    question: string;
    answer: string;
    chapter_id: number;
}

interface IndexProps {
    chapter_id: number;
    exercises: {
        data: Exercise[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Index({ chapter_id, exercises }: IndexProps) {
    const [isOpen, setIsOpen] = useState(false);
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, reset, errors } = useForm({
        question: "",
        answer: "",
        chapter_id: chapter_id,
    });

    const { delete: destroy } = useForm();

    const handleDelete = (exerciseId: number) => {
        destroy(route('exercises.destroy', exerciseId), {
            onSuccess: () => {
                // L'exercice sera automatiquement retiré grâce à la mise à jour Inertia
            },
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("exercises.store"), {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Exercices" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Exercices</h1>
                    <Button onClick={() => setIsOpen(true)}>
                        <Plus />
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {exercises.data.length > 0 ? (
                        exercises.data.map((exercise) => (
                            <div key={exercise.id} className="border p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-4 w-full">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold">Question:</h3>
                                            <div className="bg-white rounded-lg p-4">
                                                <MarkdownComponent content={exercise.question} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold">Réponse:</h3>
                                            <div className="bg-white rounded-lg p-4">
                                                <MarkdownComponent content={exercise.answer} />
                                            </div>
                                        </div>
                                    </div>
                                    {user.role === 'admin' && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => router.visit(route('exercises.edit', exercise.id))}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(exercise.id)}>
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500">Aucun exercice trouvé</div>
                    )}
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un exercice</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <Textarea
                            placeholder="Question"
                            value={data.question}
                            onChange={(e) => setData("question", e.target.value)}
                        />
                        <InputError message={errors.question} />
                        <Textarea
                            placeholder="Réponse"
                            value={data.answer}
                            onChange={(e) => setData("answer", e.target.value)}
                        />
                        <InputError message={errors.answer} />
                        <Button type="submit" disabled={processing}>
                            Créer
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}