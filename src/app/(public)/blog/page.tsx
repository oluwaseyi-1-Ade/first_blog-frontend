import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockPosts, mockCategories } from "@/lib/mock-data";
import { BlogCard } from "@/components/features/blog-card";
import { SearchInput } from "@/components/features/search-input";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FadeIn, CardFadeIn, StaggerChildren } from "@/components/animations/fade-in";

// Ensure pageProps are correctly typed for Next 15+ or 13+
interface BlogPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage(props: BlogPageProps) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const searchQuery = (searchParams.q as string) || "";
    const categorySlug = (searchParams.category as string) || "all";

    const POSTS_PER_PAGE = 6;

    // Filter posts
    let filteredPosts = mockPosts.filter((post) => post.status === "published");

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(q) ||
                post.excerpt.toLowerCase().includes(q)
        );
    }

    if (categorySlug && categorySlug !== "all") {
        filteredPosts = filteredPosts.filter(
            (post) => post.category.slug === categorySlug
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

            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-muted/20 p-4 rounded-lg">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Link href="/blog">
                        <Badge
                            variant={categorySlug === "all" ? "default" : "outline"}
                            className="cursor-pointer text-sm px-3 py-1"
                        >
                            All
                        </Badge>
                    </Link>
                    {mockCategories.map((cat) => (
                        <Link key={cat.id} href={`/blog?category=${cat.slug}`}>
                            <Badge
                                variant={categorySlug === cat.slug ? "default" : "outline"}
                                className="cursor-pointer text-sm px-3 py-1"
                            >
                                {cat.name}
                            </Badge>
                        </Link>
                    ))}
                </div>

                {/* Search */}
                <SearchInput />
            </div>

            {filteredPosts.length > 0 ? (
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post) => (
                        <CardFadeIn key={post.id}>
                            <BlogCard post={post} />
                        </CardFadeIn>
                    ))}
                </StaggerChildren>
            ) : (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No posts found matching your criteria.</p>
                    <Link href="/blog">
                        <Button variant="link" className="mt-2">Clear filters</Button>
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
                        ...(searchQuery && { q: searchQuery }),
                        ...(categorySlug !== "all" && { category: categorySlug })
                    }}
                />
            )}
        </div>
    );
}
