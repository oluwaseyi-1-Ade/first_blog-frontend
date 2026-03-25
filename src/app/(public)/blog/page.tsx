import Link from "next/link";
import { api } from "@/lib/api";
import { BlogCard } from "@/components/features/blog-card";
import { SearchInput } from "@/components/features/search-input";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { FadeIn, CardFadeIn, StaggerChildren } from "@/components/animations/fade-in";
import { BlogPost } from "@/types";

// Ensure pageProps are correctly typed for Next 15+ or 13+
interface BlogPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage(props: BlogPageProps) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const searchQuery = (searchParams.q as string) || "";

    const POSTS_PER_PAGE = 6;

    let allPosts: BlogPost[] = [];
    try {
        allPosts = await api.posts.getAll();
    } catch (error) {
        console.error("Error fetching posts:", error);
    }


    // Filter posts locally for search
    let filteredPosts = allPosts;

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(q) ||
                post.description.toLowerCase().includes(q)
        );
    }

    // Pagination
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);


    return (
        <div className="container px-4 md:px-6 mx-auto py-12 md:py-20 space-y-10">
            <div className="space-y-4 text-center md:text-left">
                <FadeIn>
                    <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary">Our Blog</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Thoughts on faith, culture, and living a life of purpose.
                    </p>
                </FadeIn>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-muted/10 p-4 rounded-2xl border border-border/20 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium text-muted-foreground">{totalPosts} Articles Published</span>
                </div>
                <div className="w-full md:w-auto">
                    <SearchInput />
                </div>
            </div>

            {filteredPosts.length > 0 ? (
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post) => (
                        <CardFadeIn key={post._id}>
                            <BlogCard post={post} />
                        </CardFadeIn>
                    ))}
                </StaggerChildren>
            ) : (
                <div className="text-center py-32 bg-muted/5 rounded-3xl border border-dashed border-border/40">
                    <p className="text-muted-foreground text-xl font-serif italic">No stories found in this chapter.</p>
                    <Link href="/blog">
                        <Button variant="link" className="mt-4 text-primary hover:text-primary/80 transition-colors">Begin search again</Button>
                    </Link>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    baseUrl="/blog"
                    queryParams={{
                        ...(searchQuery && { q: searchQuery })
                    }}
                />
            )}

        </div>
    );
}
