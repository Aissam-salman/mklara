import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import MarkdownComponent from "@/Components/MarkdownComponent.js";

interface Exercise {
    id: number;
    question: string;
    answer: string;
    chapter_id: number;
}

interface ShowProps {
    exercise: Exercise;
}

export default function Show({ exercise }: ShowProps) {
    return (
        <AuthenticatedLayout>
            <Head title={`Exercice #${exercise.id}`} />
            <div className="container mx-auto p-4">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">Exercice</h1>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Question :</h3>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <MarkdownComponent content={exercise.question} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Réponse :</h3>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <MarkdownComponent content={exercise.answer} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}