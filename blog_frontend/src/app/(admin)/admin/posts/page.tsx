import Link from "next/link";
import { format } from "date-fns";
import { MoreHorizontal, PenSquare, Trash2 } from "lucide-react";
import { mockPosts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Need to create Table component
import { Badge } from "@/components/ui/badge";

// I need to implement the Table component in src/components/ui/table.tsx 
// For now I will use standard standard HTML table or implement the Table component.
// I'll implement the Table component quickly after this tool call.

export default function AdminPostsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif tracking-tight">Posts</h1>
                <Link href="/admin/posts/create">
                    <Button className="gap-2">
                        <PenSquare className="h-4 w-4" /> Create Post
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Title</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Published At</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {mockPosts.map((post) => (
                                <tr key={post.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{post.title}</td>
                                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                        <Badge variant={post.status === "published" ? "secondary" : "outline"}>
                                            {post.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                                    </td>
                                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Actions</span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
