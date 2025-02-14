import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {  Exercise } from "@/types";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/InputError";
import { Toaster } from "@/Components/ui/toaster.js";
import { useToast } from "@/hooks/use-toast.js";

interface EditProps {
    exercise: Exercise;
}


const Edit = ({ exercise }: EditProps) => {
    const { data, setData, put, processing, errors } = useForm({
        question: exercise.question,
        answer: exercise.answer,
    });

    const { toast } = useToast();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("exercises.update", exercise.id), {
            onSuccess: () => {
                toast({
                    title: "Succès",
                    description: "L'exercice a été mis à jour avec succès.",
                });
                setTimeout(() => {
                    window.history.back();
                 }, 2000)
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Modifier numero: ${exercise.id}`} />

            <div className="max-w-4xl p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Modifier un exercice</h2>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="question"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Question
                        </label>
                        <Textarea
                            id="question"
                            value={data.question}
                            onChange={e => setData('question', e.target.value)}
                            placeholder="Entrez la question de l'exercice"
                            rows={20}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        />
                        <InputError message={errors.question} />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="answer"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Contenu du chapitre
                        </label>
                        <Textarea
                            id="answer"
                            value={data.answer}
                            onChange={e => setData('answer', e.target.value)}
                            placeholder="Entrez la reponse de l'exercice"
                            rows={20}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        />
                        <InputError message={errors.answer} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Sauvegarder
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </div>
            <Toaster />
        </AuthenticatedLayout>
    );
}

export default Edit;