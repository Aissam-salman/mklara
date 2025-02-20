import { FormEventHandler, useEffect, useState } from 'react';
import { Group } from '@/types/index.js';
import Authenticated from '@/Layouts/AuthenticatedLayout.js';
import { Input } from '@/Components/ui/input.js';
import { Button } from '@/Components/ui/button.js';
import { Send } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { router, useForm } from '@inertiajs/react';
import { formatRelativeTime } from '@/utils/formator.js';
import MarkdownComponent from '@/Components/MarkdownComponent.js';


interface ShowGroupProps {
    group: Group
}

const Show = ({ group }: ShowGroupProps) => {4
    const [messages, setMessages] = useState(group.messages || []);
    const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
    const [editingContent, setEditingContent] = useState('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        console.log(`🔌 Connexion au canal pour le groupe ${group.id}`);
        //@ts-ignore
        const channel = Echo.private(`group-messages.${group.id}`)
            //@ts-ignore
            .listen('GroupMessageSent', (payload) => {
            console.log(payload)
            setMessages(prev => [...prev, payload]);
        });

        setCount(prev => prev + 1);
        console.log(count);

        return () => {
            if (channel) {
                console.log(`🔴 Déconnexion du canal ${group.id}`);
                channel.stopListening('GroupMessageSent');
                //@ts-ignore
                Echo.leave(`group-messages.${group.id}`);
            }
        };
    }, [group.id])

    const { data, setData, post, errors, reset } = useForm({
        content: '',
    })

    const handleEditMessage = (messageId: number, currentContent: string) => {
        console.log('edit')
        console.log('messageId: ', messageId, 'currentContent: ', currentContent);
        setEditingMessageId(messageId);
        setEditingContent(currentContent);
    }

    const handleUpdateMessage = (GroupmessageId: number) => {
        console.log(editingContent);
        router.patch(
            route('group-messages.update', GroupmessageId),
            { content: editingContent },
            {
                onSuccess: () => {
                    setEditingMessageId(null);
                    setEditingContent('');
                },
                onError: (errors) => {
                    console.log(errors);
                }
            });
    }

    const handleSendMessage: FormEventHandler = (e) => {
        e.preventDefault();

        if (!data.content.trim()) return;

        post(route('group-messages.store', group.id), {
            onSuccess: () => {
                reset();
            },
            onError: (err) => console.error('error from lara:', err)
        })
    }

    const { delete: destroy } = useForm();
    const handleDelete = (GroupmessageId: number) => {
        destroy(route('group-messages.destroy', GroupmessageId), {
            onSuccess: () => {
                // Le groupe sera automatiquement retiré grâce à la mise à jour Inertia
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    }

    return (
        <Authenticated>
            <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-black/90 text-white p-4 flex items-center gap-4">
                    <img className="w-14 h-14 rounded-full" src={group.photo_url} alt={group.name} />
                    <h1>{group.name}</h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-2">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setIsOpen(true)}>Informations du groupe</DropdownMenuItem>
                            <DropdownMenuItem>Notifications</DropdownMenuItem>
                            <DropdownMenuItem>Quitter le groupe</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="h-96 overflow-y-auto p-4 bg-gray-100">
                    {messages?.map((message) => (
                        <div key={message.id} className={`mb-4  ${message.user.name === "You" ? "text-right" : ""}`}>
                            <div className={`inline-block p-2 min-w-[50%] relative rounded-lg ${message.user.name === "You" ? "bg-green-100" : "bg-white"}`}>
                                <div className="flex flex-col">
                                    <p className="font-semibold">{message.user.name}</p>
                                    {editingMessageId === message.id ? (
                                        <div className="flex gap-2">
                                            <Input
                                                value={editingContent}
                                                onChange={(e) => setEditingContent(e.target.value)}
                                                className="flex-grow"
                                            />
                                            <Button onClick={() => handleUpdateMessage(message.id)}>Sauvegarder</Button>
                                            <Button variant="outline" onClick={() => setEditingMessageId(null)}>Annuler</Button>
                                        </div>
                                    ) : (
                                        <div className='flex'>
                                            <MarkdownComponent content={message.content} />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0 absolute bottom-0 right-1">
                                                        <MoreVertical className="h-3 w-3" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => handleEditMessage(message.id, message.content)}>
                                                        Modifier
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(message.id)}>
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">
                                    {message.created_at ? formatRelativeTime(message.created_at) : "A l'instant"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage}>
                    <div className="p-4 bg-white flex items-center">
                        <Input
                            type="text"
                            placeholder="Type a message..."
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="flex-grow mr-2"
                        />
                        <Button type='submit'>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader className='text-2xl font-bold'>
                        <DialogTitle >
                            Details du groupe
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <h2 className='font-bold text-muted-foreground'>Description</h2>
                        <p>{group.description}</p>
                        <h2 className='text-muted-foreground font-bold'>Membres</h2>
                        {group.members.length === 0 ? (
                            <p>Aucun membre pour le moment</p>
                        ) : (
                            <ul>
                                {group.members.map(member => (
                                    <li key={member.user?.id}>
                                        {member.user?.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <DialogFooter className="sm:justify-start flex flex-col gap-6">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                                Fermer
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Authenticated>
    );
}

export default Show;