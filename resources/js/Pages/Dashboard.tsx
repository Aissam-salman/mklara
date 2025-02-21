import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Activity, BookOpen, Users, MessageSquare } from 'lucide-react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-6 w-6" />
                            Activité récente
                        </CardTitle>
                        <CardDescription>Vos dernières actions sur Minkey</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">Aucun activité pour le moment.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-6 w-6" />
                            Cours en cours
                        </CardTitle>
                        <CardDescription>Continuez votre apprentissage</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">0 cours en progression</p>
                        <Button variant="link" className="p-0 mt-2" onClick={() => router.visit('courses.index')}>
                            Voir les cours
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-6 w-6" />
                            Communauté
                        </CardTitle>
                        <CardDescription>Interagissez avec la communauté</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="link" className="p-0 mt-2" onClick={() => router.visit('groups.index')}>
                            Voir les discussions
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-6 w-6" />
                            Messages
                        </CardTitle>
                        <CardDescription>Vos dernières conversations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">3 messages non lus</p>
                        <Button variant="link" className="p-0 mt-2">
                            Voir les messages
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 mt-6 md:grid-cols-2">
                <Card className="min-h-[400px]">
                    <CardHeader>
                        <CardTitle>Progression des cours</CardTitle>
                        <CardDescription>Votre avancement dans les différents cours</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                            Graphique de progression
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-h-[400px]">
                    <CardHeader>
                        <CardTitle>Activité récente</CardTitle>
                        <CardDescription>Vos dernières actions sur la plateforme</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                            Liste des activités
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
