import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Chapter } from "@/types";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/InputError";

interface EditProps {
    chapter: Chapter;
}

const Edit = ({ chapter }: EditProps) => {
    const { data, setData, put, processing, errors } = useForm({
        title: chapter.title,
        content: chapter.content,
        order: chapter.order,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("chapters.update", chapter.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Modifier ${chapter.title}`} />

            <div className="max-w-4xl p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Modifier le chapitre</h2>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="order"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Ordre du chapitre
                        </label>
                        <Input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={e => setData('order', +e.target.value)}
                            placeholder="Ordre du chapitre"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="space-y-2">

                        <label
                            htmlFor="title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Titre du chapitre
                        </label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="Entrez le titre du chapitre"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="content"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Contenu du chapitre
                        </label>
                        <Textarea
                            id="content"
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            placeholder="Entrez le contenu du chapitre"
                            rows={20}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        />
                        <InputError message={errors.content} />
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
        </AuthenticatedLayout>
    );
}

export default Edit;