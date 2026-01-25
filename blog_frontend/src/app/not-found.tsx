import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-background text-foreground">
            <h2 className="text-4xl font-bold font-serif text-primary">404 - Page Not Found</h2>
            <p className="text-muted-foreground text-center max-w-md">
                We couldn't find the page you were looking for. It might have been moved or doesn't exist.
            </p>
            <Link href="/">
                <Button variant="default" className="mt-4">
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
