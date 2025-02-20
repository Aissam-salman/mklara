import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const MarkdownComponent = ({ content }: { content: string }) => {
    return (
        <Markdown
            className="prose prose-invert max-w-none"
            remarkPlugins={[remarkGfm]}
            components={{
                // Gestion des liens embedables
                a({ node, href, children, ...props }) {
                    // Détection des liens YouTube
                    if (href?.includes('youtube.com/embed')) {
                        return (
                            <iframe
                                className="p-6"
                                width="100%"
                                height="415"
                                src={href}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        );
                    }
                    // Détection des liens Typeform
                    if (href?.includes('typeform.com/to')) {
                        return (
                            <iframe
                                className="p-6"
                                width="100%"
                                height="500"
                                src={href}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        );
                    }
                    // Lien normal
                    return <a href={href} {...props}>{children}</a>;
                },
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            //@ts-ignore
                            style={dark}
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {content}
        </Markdown>
    );
};

export default MarkdownComponent;
