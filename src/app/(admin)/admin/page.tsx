import Link from "next/link";
import { FileText, Users, PenSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockPosts } from "@/lib/mock-data";

export default function AdminDashboard() {
    const totalPosts = mockPosts.length;
    const publishedPosts = mockPosts.filter((p) => p.status === "published").length;
    const draftPosts = mockPosts.filter((p) => p.status === "draft").length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif tracking-tight">Dashboard</h1>
                <Link href="/admin/posts/create">
                    <Button className="gap-2">
                        <PenSquare className="h-4 w-4" /> Create Post
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPosts}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all categories
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{publishedPosts}</div>
                        <p className="text-xs text-muted-foreground">
                            Visible to the public
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{draftPosts}</div>
                        <p className="text-xs text-muted-foreground">
                            Work in progress
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {mockPosts.slice(0, 5).map(post => (
                                <div key={post.id} className="flex items-center justify-between p-4">
                                    <div className="space-y-1">
                                        <p className="font-medium leading-none">{post.title}</p>
                                        <p className="text-sm text-muted-foreground">{post.author.name} • {new Date(post.publishedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
