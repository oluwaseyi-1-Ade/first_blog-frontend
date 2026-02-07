"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold font-serif tracking-tight text-primary">Faith Blog</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-primary border-b-2 border-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button variant="ghost" size="icon">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                        <div className="flex items-center gap-2 border-l pl-4 ml-4">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">Sign up</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-b bg-background">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block text-lg font-medium py-2 transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t flex flex-col gap-2">
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full">Log in</Button>
                            </Link>
                            <Link href="/signup" onClick={() => setIsOpen(false)}>
                                <Button className="w-full">Sign up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
