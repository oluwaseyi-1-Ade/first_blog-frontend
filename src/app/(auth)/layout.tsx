import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
            <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <Link href="/">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Button>
                </Link>
            </div>
            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col items-center text-center space-y-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold font-serif tracking-tight text-primary">Faith Blog</span>
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
