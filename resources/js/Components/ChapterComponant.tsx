import { Chapter } from "@/types/index.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.js";

export const ChapterComponent = ({ chapter }: { chapter: Chapter }) => {
    return (
        <div key={chapter.id}>
            <Card>
                <CardHeader>
                    <CardTitle>{chapter.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ReactMarkdown children={chapter.content} remarkPlugins={[remarkGfm]} />
                </CardContent>
            </Card>
        </div>
    );
}