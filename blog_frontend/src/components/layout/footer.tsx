import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t bg-muted/40 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold font-serif tracking-tight text-primary">Faith Blog</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Sharing wisdom, hope, and grace for the journey.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/blog" className="hover:underline hover:text-primary">Blog</Link></li>
                            <li><Link href="/about" className="hover:underline hover:text-primary">About</Link></li>
                            <li><Link href="/contact" className="hover:underline hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/devotional" className="hover:underline hover:text-primary">Daily Devotionals</Link></li>
                            <li><Link href="/study" className="hover:underline hover:text-primary">Bible Study</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:underline hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:underline hover:text-primary">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Faith Blog. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
