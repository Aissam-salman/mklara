import { useState } from 'react';
import { Group } from '@/types/index.js';
import Authenticated from '@/Layouts/AuthenticatedLayout.js';
import { Input } from '@/Components/ui/input.js';
import { Button } from '@/Components/ui/button.js';
import { Send } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface ShowGroupProps {
    group: Group
}

const Show = ({ group }: ShowGroupProps) => {
    const [newMessage, setNewMessage] = useState('');

    function handleSendMessage() {
        throw new Error('Function not implemented.');
    }

    const [isOpen, setIsOpen] = useState<boolean>(false);

    console.log(group.members)


    return (
        <Authenticated>

            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-black text-white p-4 flex items-center gap-4">
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
                    {group.messages?.map((message) => (
                        <div key={message.id} className={`mb-4 ${message.user.name === "You" ? "text-right" : ""}`}>
                            <div className={`inline-block p-2 rounded-lg ${message.user.name === "You" ? "bg-green-100" : "bg-white"}`}>
                                <p className="font-semibold">{message.user.name}</p>
                                <p>{message.content}</p>
                                <p className="text-xs text-gray-500">{message.created_at?.toString() || "A l'instant"}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-white flex items-center">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow mr-2"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage()
                            }
                        }}
                    />
                    <Button onClick={handleSendMessage} >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
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