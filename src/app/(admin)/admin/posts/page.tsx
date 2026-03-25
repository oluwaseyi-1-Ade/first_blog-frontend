"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { MoreHorizontal, PenSquare, Trash2, ExternalLink, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import { BlogPost } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const data = await api.posts.getAll();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to load posts");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        
        try {
            await api.posts.delete(id);
            setPosts(posts.filter(p => p._id !== id));
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete post");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-serif tracking-tight text-primary">Posts</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Manage your stories and articles.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="icon" onClick={fetchPosts} disabled={isLoading} className="rounded-xl">
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                    <Link href="/admin/posts/create">
                        <Button className="gap-2 rounded-xl px-5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
                            <PenSquare className="h-4 w-4" /> Create Post
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-[2rem] border border-border/40 bg-card/30 backdrop-blur-md overflow-hidden shadow-sm">
                <div className="relative w-full overflow-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border/40 bg-muted/20">
                                <th className="h-14 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Title</th>
                                <th className="h-14 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Preview</th>
                                <th className="h-14 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Date</th>
                                <th className="h-14 px-6 text-right align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="p-6"><div className="h-4 bg-muted rounded w-3/4"></div></td>
                                        <td className="p-6"><div className="h-4 bg-muted rounded w-1/2"></div></td>
                                        <td className="p-6"><div className="h-4 bg-muted rounded w-1/3"></div></td>
                                        <td className="p-6"><div className="h-8 bg-muted rounded w-8 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr key={post._id} className="transition-colors hover:bg-muted/10 group">
                                        <td className="p-6 align-middle font-medium text-base">
                                            <div className="flex items-center gap-3">
                                                {post.image && (
                                                    <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 border border-border/20">
                                                        <img src={post.image} alt="" className="h-full w-full object-cover" />
                                                    </div>
                                                )}
                                                <span className="line-clamp-1">{post.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle">
                                            <span className="text-muted-foreground/70 line-clamp-1 max-w-[200px]">{post.description}</span>
                                        </td>
                                        <td className="p-6 align-middle text-muted-foreground whitespace-nowrap">
                                            {post.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : "N/A"}
                                        </td>
                                        <td className="p-6 align-middle text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted font-bold">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[180px] rounded-2xl p-2 shadow-xl border-border/40">
                                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <Link href={`/blog/${post._id}`} target="_blank">
                                                        <DropdownMenuItem className="rounded-xl cursor-pointer gap-2">
                                                            <ExternalLink className="h-4 w-4" /> View Post
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link href={`/admin/posts/${post._id}/edit`}>
                                                        <DropdownMenuItem className="rounded-xl cursor-pointer gap-2">
                                                            <PenSquare className="h-4 w-4" /> Edit Post
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem 
                                                        className="rounded-xl cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive gap-2"
                                                        onClick={() => handleDelete(post._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" /> Delete Post
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-muted-foreground text-lg">No posts found.</p>
                                            <Link href="/admin/posts/create">
                                                <Button variant="link">Create your first post</Button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

