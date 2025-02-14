import { Button } from "@/Components/ui/button";
import { Chapter, Section } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { router } from "@inertiajs/react";

interface IndexProps {
    section: Section;
    chapters: {
        data: Chapter[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Index({ section, chapters }: IndexProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        content: "",
        section_id: section.id,
        order: 1,
    });

    const user = usePage().props.auth.user;

    const { delete: destroy } = useForm();

    const handleDelete = (chapterId: number) => {

        destroy(route('chapters.destroy', chapterId), {
            onSuccess: () => {
                // Le chapitre sera automatiquement retiré grâce à la mise à jour Inertia
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

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
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    {chapters.data.length > 0 ? (
                        <>
                            {chapters.data.map((chapter, index) => (
                                <div key={chapter.id}>
                                    <div className="flex items-center justify-start gap-2">
                                        <ChapterComponent chapter={chapter} />
                                        <div className="">

                                            {chapters.current_page === (chapters.total) && (
                                                <Button variant="secondary" onClick={() => router.visit(route('exercises.index', { chapter_id: chapter.id }))}>
                                                    Exercices
                                                </Button>
                                            )}
                                            {user.role == 'admin' && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => router.visit(route('chapters.edit', chapter.id))}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Modifier
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(chapter.id)}>
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Supprimer
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </div>
                                    </div>
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
                            type="number"
                            placeholder="Ordre du chapitre"
                            value={data.order}
                            onChange={(e) => setData("order", +e.target.value)}
                        />
                        <InputError message={errors.order} />
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