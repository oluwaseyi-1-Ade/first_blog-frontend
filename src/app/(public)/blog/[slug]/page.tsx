import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Share2, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: BlogPostPageProps) {
    const { slug } = await props.params;
    try {
        const post = await api.posts.getById(slug);
        return { title: post.title };
    } catch {
        return { title: "Post Not Found" };
    }
}

export default async function BlogPostPage(props: BlogPostPageProps) {
    const { slug: id } = await props.params;
    
    let post;
    try {
        post = await api.posts.getById(id);
    } catch (error) {
        console.error("Error fetching post:", error);
        notFound();
    }

    if (!post) {
        notFound();
    }


    return (
        <div className="container px-4 md:px-6 mx-auto py-12 md:py-20">
            <Link href="/blog">
                <Button variant="ghost" className="mb-8 pl-0 hover:pl-0 hover:bg-transparent hover:text-primary transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Button>
            </Link>

            <article className="max-w-3xl mx-auto space-y-8">
                <FadeIn>
                    <div className="space-y-4 text-center">
                        <Badge variant="secondary" className="rounded-full px-4 text-[10px] uppercase tracking-widest border-primary/20 text-primary bg-primary/5">Article</Badge>
                        <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight text-primary">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.createdAt ? format(new Date(post.createdAt), "MMMM d, yyyy") : "Recently Published"}</span>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    {post.image && (
                        <div className="rounded-4xl overflow-hidden shadow-2xl my-12 border border-border/10">

                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-auto object-cover max-h-[600px] hover:scale-[1.02] transition-transform duration-700"
                            />
                        </div>
                    )}
                </FadeIn>

                <FadeIn delay={0.3}>
                    {/* Content Body */}
                    <div className="prose prose-lg dark:prose-invert max-w-none font-sans leading-relaxed text-foreground/80 tracking-tight">
                        <div className="whitespace-pre-wrap text-lg md:text-xl leading-relaxed">
                            {post.description}
                        </div>
                    </div>
                </FadeIn>

                <hr className="border-border/10 my-16" />

                <div className="flex items-center justify-center py-6">
                    <Button variant="outline" size="lg" className="gap-2 rounded-full px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                        <Share2 className="w-4 h-4" /> Share this Article
                    </Button>
                </div>
            </article>
        </div>
    );
}

