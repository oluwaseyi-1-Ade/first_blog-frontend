"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Save, Trash2, Image as ImageIcon } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await api.posts.getById(id);
                setFormData({
                    title: post.title,
                    description: post.description,
                    image: post.image || ""
                });
            } catch (error) {
                console.error("Error fetching post:", error);
                toast.error("Failed to load post data");
                router.push("/admin/posts");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [id, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);
        try {
            await api.posts.update(id, formData);
            toast.success("Changes saved successfully!");
            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            console.error("Error updating post:", error);
            toast.error("Failed to update article. Please try again.");
        } finally {
            setIsSaving(false);
        }
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        
        try {
            await api.posts.delete(id);
            toast.success("Post deleted successfully");
            router.push("/admin/posts");
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete post");
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
                <p className="text-muted-foreground animate-pulse">Loading story details...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <Link href="/admin/posts">
                    <Button variant="ghost" className="gap-2 rounded-full hover:bg-muted transition-colors pl-0 pr-4">
                        <ArrowLeft className="h-4 w-4" /> Back to Posts
                    </Button>
                </Link>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleDelete}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full px-4"
                >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Forever
                </Button>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-primary">Edit Story</h1>
                <p className="text-muted-foreground text-lg">Refine your narrative and structure.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12 pb-20">
                <div className="space-y-8 bg-card/30 backdrop-blur-md p-8 rounded-[2.5rem] border border-border/40 shadow-sm">
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Article Title</label>
                        <Input 
                            placeholder="Enter a compelling title..." 
                            className="text-2xl md:text-3xl font-serif h-auto py-4 bg-transparent border-none focus-visible:ring-0 px-0 placeholder:text-muted-foreground/30"
                            required 
                            disabled={isSaving}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <div className="h-px bg-linear-to-r from-primary/20 via-primary/5 to-transparent" />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                            <ImageIcon className="h-3 w-3" /> Cover Image URL
                        </label>
                        <Input 
                            placeholder="https://images.unsplash.com/photo..." 
                            className="bg-muted/30 border-border/20 rounded-2xl h-12 focus:bg-background transition-all"
                            disabled={isSaving}
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Content & Description</label>
                        <textarea
                            className="flex min-h-[350px] w-full rounded-2xl border-none bg-muted/20 px-6 py-6 text-lg ring-offset-background placeholder:text-muted-foreground/30 focus-visible:outline-none focus:bg-background transition-all disabled:cursor-not-allowed disabled:opacity-50 font-sans leading-relaxed"
                            placeholder="Update your story..."
                            required
                            disabled={isSaving}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-border/20">
                    <p className="text-sm text-muted-foreground italic">Last modified recently.</p>
                    <div className="flex gap-4">
                        <Button variant="outline" type="button" disabled={isSaving} onClick={() => router.back()} className="rounded-full px-8 h-12">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving} className="rounded-full px-10 h-12 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 border-none">
                            {isSaving ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-5 w-5" />
                            )}
                            Update Story
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

