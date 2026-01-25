"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import { mockCategories, mockPosts } from "@/lib/mock-data";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const post = mockPosts.find(p => p.id === id);

    const [isLoading, setIsLoading] = useState(false);

    // If connected to real API, fetch data here. 
    // For mock, we rely on the find above. 
    // In a real app, use useEffect or Server Component to fetch data.

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        setTimeout(() => {
            setIsLoading(false);
            router.push("/admin/posts");
        }, 1500);
    }

    if (!post) {
        return <div>Post not found</div>
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold font-serif tracking-tight">Edit Post</h1>
                </div>
                <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Post
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input defaultValue={post.title} required disabled={isLoading} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <Input defaultValue={post.slug} required disabled={isLoading} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                        defaultValue={post.category.id}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {mockCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Content (Markdown)</label>
                    <textarea
                        className="flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue={post.content}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Button variant="outline" type="button" disabled={isLoading} onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        Update Post
                    </Button>
                </div>
            </form>
        </div>
    );
}
