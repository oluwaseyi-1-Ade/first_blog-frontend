import Link from "next/link";
import { format } from "date-fns";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

import { BlogPost } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    const formattedDate = post.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : "Recent";
    
    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-border/40 hover:border-primary/20 group bg-card/50 backdrop-blur-sm">
            {post.image && (
                <div className="relative w-full h-52 overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                </div>
            )}
            <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-medium text-[10px] uppercase tracking-wider px-2 py-0 border-primary/30 text-primary">Article</Badge>
                </div>
                <CardTitle className="font-serif text-2xl leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post._id}`} className="block">
                        {post.title}
                    </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/80">
                    {post.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter className="text-[12px] text-muted-foreground/60 border-t border-border/20 bg-muted/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300 text-primary font-medium">
                    <span>Read more</span>
                    <ArrowLeft className="w-3 h-3 rotate-180" />
                </div>
            </CardFooter>
        </Card>
    );
}

