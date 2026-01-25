import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Share2, Clock, Calendar } from "lucide-react";
import { mockPosts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Need to create Avatar component or use simple img
import { BlogCard } from "@/components/features/blog-card";
import { FadeIn, CardFadeIn } from "@/components/animations/fade-in";

// Create a simple Avatar component usage inline or import if I made it? 
// I didn't make Avatar component yet. I will make a simple one here locally or use img.
// Actually, let's just use a rounded img for simplicity or create the Primitive later.
// I'll stick to img for now.

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: BlogPostPageProps) {
    const params = await props.params;
    const post = mockPosts.find((p) => p.slug === params.slug);
    if (!post) return { title: "Post Not Found" };
    return { title: post.title };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
    const params = await props.params;
    const post = mockPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    // Related posts (same category, excluding current)
    const relatedPosts = mockPosts
        .filter((p) => p.category.id === post.category.id && p.id !== post.id)
        .slice(0, 3);

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
                        <Badge variant="secondary">{post.category.name}</Badge>
                        <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight text-primary">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readingTime} min read</span>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    {post.coverImage && (
                        <div className="rounded-xl overflow-hidden shadow-lg my-8">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        </div>
                    )}
                </FadeIn>

                <FadeIn delay={0.3}>
                    {/* Content Body - In a real app, use a Markdown renderer like react-markdown */}
                    <div className="prose prose-lg dark:prose-invert max-w-none font-sans leading-relaxed text-foreground/90">
                        {/* Rudimentary markdown rendering for mock data */}
                        {post.content.split('\n').map((line, index) => {
                            if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-serif font-bold mt-8 mb-4">{line.replace('# ', '')}</h1>
                            if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-serif font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>
                            if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-serif font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>
                            if (line.startsWith('> ')) return <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">{line.replace('> ', '')}</blockquote>
                            if (line.trim() === '') return <div key={index} className="h-4"></div>
                            return <p key={index} className="mb-4">{line}</p>
                        })}
                    </div>
                </FadeIn>

                <hr className="border-border" />

                <div className="flex items-center justify-between py-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                            {post.author.avatar ? <img src={post.author.avatar} alt={post.author.name} /> : (
                                <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg">
                                    {post.author.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-medium text-foreground">Written by {post.author.name}</p>
                            <p className="text-sm text-muted-foreground">{post.author.role === 'admin' ? 'Editor' : 'Contributor'}</p>
                        </div>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                </div>
            </article>

            {relatedPosts.length > 0 && (
                <div className="max-w-4xl mx-auto mt-20 pt-10 border-t">
                    <h3 className="text-2xl font-serif font-bold mb-8">Related Posts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map(post => (
                            <CardFadeIn key={post.id}>
                                <BlogCard post={post} />
                            </CardFadeIn>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
