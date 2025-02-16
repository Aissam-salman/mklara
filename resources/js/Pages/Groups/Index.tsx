import { Button } from "@/Components/ui/button.js";
import Authenticated from "@/Layouts/AuthenticatedLayout.js";
import { Group } from "@/types/index.js";
import { Link, router } from "@inertiajs/react";
import { Plus, MoreVertical, Pencil, Trash, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { Card } from "@/Components/ui/card.js";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";

interface GroupsPageProps {
    groups: Group[];
}

const Index = ({ groups }: GroupsPageProps) => {
    const user = usePage().props.auth.user;

    const { delete: destroy } = useForm();

    const {data, post, setData } = useForm({
        group_id: 1,
    });

    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

    const handleDelete = (groupId: number) => {
        destroy(route('groups.destroy', groupId), {
            onSuccess: () => {
                // Le groupe sera automatiquement retiré grâce à la mise à jour Inertia
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    const handleMember = (groupId: number) => {
        const group = groups.find(g => g.id === groupId);
        const isMember = group?.members.some(member => member.id === user.id);

        if (isMember) {
            router.visit(route('groups.show', { group: groupId }));
        } else {
            setIsJoinDialogOpen(true);
            setData('group_id', groupId)
        }
    };

    const addMember = () => {
        post(route('group-members.store'), {
            onSuccess: () => {
                setIsJoinDialogOpen(false);
                router.visit(route('groups.show', data.group_id as number));
            },
            onError: (err) => {
                console.error('error from laravel:', err)
            }
        });
    }

    return (
        <Authenticated>
            <div className="p-6 bg-white rounded-sm">
                <div className="flex items-center gap-2 mb-6">
                    <h1 className="text-4xl font-bold">Groupes</h1>
                    <Button onClick={() => router.visit('/groups/create')}>
                        <Plus />
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    {groups.length > 0 ? (
                        groups.map(group => {
                            const maxLength = 200;
                            const isLong = group.description.length > maxLength;
                            const [showFull, setShowFull] = useState(false);
                            const displayText = showFull || !isLong ? group.description : group.description.slice(0, maxLength) + "...";

                            return (
                                <div key={group.id} className="block hover:bg-gray-50 transition-all duration-200">
                                    <Card
                                        onClick={() => handleMember(group.id)}
                                        className="flex items-center p-4 md:p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                    >
                                        <img
                                            src={group.photo_url || "images/default-avatar.png"}
                                            alt={group.name}
                                            width={50}
                                            height={50}
                                            className="rounded-full w-12 h-12 md:w-14 md:h-14"
                                        />
                                        <div className="ml-3">
                                            <p className="text-sm md:text-base font-semibold text-gray-900">{group.name}</p>
                                            <p className="text-xs md:text-sm text-gray-600 mt-1">
                                                {displayText}{" "}
                                                {isLong && !showFull && (
                                                    <button onClick={() => setShowFull(true)} className="text-blue-500 underline">
                                                        Voir plus
                                                    </button>
                                                )}
                                            </p>
                                        </div>
                                    </Card>

                                    {user.role === "admin" && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => router.visit(route("groups.edit", group.id))}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(group.id)}>
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <li>Aucun groupe existant</li>
                    )}
                </div>
            </div>
            <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rejoindre le groupe</DialogTitle>
                        <DialogDescription>
                            Êtes-vous sûr de vouloir rejoindre ce groupe ?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsJoinDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button onClick={addMember}>
                            Rejoindre
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Authenticated>
    );
}

export default Index;