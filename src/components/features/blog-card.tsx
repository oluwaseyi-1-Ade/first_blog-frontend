import Link from "next/link";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";
import { BlogPost } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-md border-border/60">
            {post.coverImage && (
                <div className="relative w-full h-48 overflow-hidden">
                    {/* Use Next/Image in production, standard img for now to simplify external domain config */}
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}
            <CardHeader>
                <div className="flex gap-2 mb-2">
                    <Badge variant="secondary" className="font-normal text-xs">{post.category.name}</Badge>
                </div>
                <CardTitle className="font-serif text-xl leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                    </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                    {post.excerpt}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                {/* Spacer or additional content if needed */}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground border-t bg-muted/20 p-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readingTime} min</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
