export const formatRelativeTime = (dateStr: string | undefined): string => {
    if (!dateStr) return "A l'instant";

    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return "il y a quelques secondes";
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 604800) {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 2592000) {
        const diffInWeeks = Math.floor(diffInSeconds / 604800);
        return `il y a ${diffInWeeks} semaine${diffInWeeks > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 31536000) {
        const diffInMonths = Math.floor(diffInSeconds / 2592000);
        return `il y a ${diffInMonths} mois`;
    } else {
        const diffInYears = Math.floor(diffInSeconds / 31536000);
        return `il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
    }
}