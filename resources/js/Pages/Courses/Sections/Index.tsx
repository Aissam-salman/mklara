import { Button } from "@/Components/ui/button.js";
import { Chapter, Section } from "@/types/index.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.js";
import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import InputError from "@/Components/InputError.js";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from '@/Components/ui/pagination';
import { ChapterComponent } from "@/Components/ChapterComponant";

interface IndexProps {
    section: Section;
    chapters: {
        data: Chapter[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const Index = ({ section, chapters }: IndexProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        content: "",
        section_id: section.id,
        order: section.chapters.length + 1,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route("chapters.store"), {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const renderPaginationItems = () => {
        const items = [];
        const currentPage = chapters.current_page;
        const lastPage = chapters.last_page;

        // Bouton Previous
        items.push(
            <PaginationItem key="prev">
                <PaginationPrevious
                    href={route('sections.show', [section.id, { page: currentPage - 1 }])}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
            </PaginationItem>
        );

        // Première page
        items.push(
            <PaginationItem key={1}>
                <PaginationLink href={route('sections.show', [section.id, { page: 1 }])} isActive={currentPage === 1}>
                    1
                </PaginationLink>
            </PaginationItem>
        );

        // Ellipsis gauche si nécessaire
        if (currentPage > 3) {
            items.push(<PaginationEllipsis key="ellipsis-left" />);
        }

        // Pages autour de la page courante
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(lastPage - 1, currentPage + 1); i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={route('sections.show', [section.id, { page: i }])}
                        isActive={currentPage === i}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Ellipsis droite si nécessaire
        if (currentPage < lastPage - 2) {
            items.push(<PaginationEllipsis key="ellipsis-right" />);
        }

        // Dernière page
        if (lastPage > 1) {
            items.push(
                <PaginationItem key={lastPage}>
                    <PaginationLink
                        href={route('sections.show', [section.id, { page: lastPage }])}
                        isActive={currentPage === lastPage}
                    >
                        {lastPage}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Bouton Next
        items.push(
            <PaginationItem key="next">
                <PaginationNext
                    href={route('sections.show', [section.id, { page: currentPage + 1 }])}
                    className={currentPage === lastPage ? 'pointer-events-none opacity-50' : ''}
                />
            </PaginationItem>
        );

        return items;
    };

    return (
        <AuthenticatedLayout>
            <Head title={section.title} />
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold"><span>{section.order}</span> {section.title}</h1>
                    <Button onClick={() => setIsOpen(true)}>
                        <Plus />
                        Ajouter un chapitre
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    {chapters.data.length > 0 ? (
                        <>
                            {chapters.data.map((chapter, index) => (
                                <div key={chapter.id}>
                                    <ChapterComponent chapter={chapter} />
                                    {index === chapters.data.length - 1 && (
                                        <Button
                                            className="mt-4"
                                            onClick={() => { }}
                                        >
                                            Accéder aux exercices
                                        </Button>
                                    )}
                                </div>
                            ))}

                            <Pagination>
                                <PaginationContent>
                                    {renderPaginationItems()}
                                </PaginationContent>
                            </Pagination>
                        </>
                    ) : (
                        <div className="text-sm text-gray-500">Aucun chapitre trouvé</div>
                    )}
                </div>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un chapitre</DialogTitle>
                    </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Titre du chapitre"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                        />
                        <InputError message={errors.title} />
                            <Textarea
                                placeholder="Contenu du chapitre"
                                value={data.content}
                                onChange={(e) => setData("content", e.target.value)}
                        />
                        <InputError message={errors.content} />
                            <Button type="submit" disabled={processing}>
                                Créer
                            </Button>
                        </form>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}

export default Index;