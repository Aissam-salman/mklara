import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Chapter, Section } from "@/types";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/InputError";

interface EditProps {
    chapter: Chapter;
    section: Section;
}

export default function Edit({ chapter, section }: EditProps) {
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

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl font-bold mb-4">Modifier le chapitre</h2>

                <form onSubmit={submit} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-20">
                            <Input
                                type="number"
                                value={data.order}
                                onChange={e => setData('order', Number(e.target.value))}
                                placeholder="Ordre"
                            />
                            <InputError message={errors.order} />
                        </div>
                        <div className="flex-1">
                            <Input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Titre du chapitre"
                            />
                            <InputError message={errors.title} />
                        </div>
                    </div>

                    <div>
                        <Textarea
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            placeholder="Contenu du chapitre"
                            rows={10}
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