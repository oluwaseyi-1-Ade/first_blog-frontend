"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Save, Image as ImageIcon } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function CreatePostPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: ""
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.posts.create(formData);
            toast.success("Article published successfully!");
            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to publish article. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <Link href="/admin/posts">
                    <Button variant="ghost" className="gap-2 rounded-full hover:bg-muted transition-colors pl-0 pr-4">
                        <ArrowLeft className="h-4 w-4" /> Back to Posts
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Draft Mode</span>
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-primary">New Story</h1>
                <p className="text-muted-foreground text-lg">Share your thoughts with the world.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12 pb-20">
                <div className="space-y-8 bg-card/30 backdrop-blur-md p-8 rounded-[2.5rem] border border-border/40 shadow-sm">
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Article Title</label>
                        <Input 
                            placeholder="Enter a compelling title..." 
                            className="text-2xl md:text-3xl font-serif h-auto py-4 bg-transparent border-none focus-visible:ring-0 px-0 placeholder:text-muted-foreground/30"
                            required 
                            disabled={isLoading}
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
                            disabled={isLoading}
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Content & Description</label>
                        <textarea
                            className="flex min-h-[350px] w-full rounded-2xl border-none bg-muted/20 px-6 py-6 text-lg ring-offset-background placeholder:text-muted-foreground/30 focus-visible:outline-none focus:bg-background transition-all disabled:cursor-not-allowed disabled:opacity-50 font-sans leading-relaxed"
                            placeholder="Once upon a time..."
                            required
                            disabled={isLoading}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-border/20">
                    <p className="text-sm text-muted-foreground italic">Your changes are automatically pre-saved.</p>
                    <div className="flex gap-4">
                        <Button variant="outline" type="button" disabled={isLoading} onClick={() => router.back()} className="rounded-full px-8 h-12">
                            Discard
                        </Button>
                        <Button type="submit" disabled={isLoading} className="rounded-full px-10 h-12 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 border-none">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-5 w-5" />
                            )}
                            Publish Story
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

