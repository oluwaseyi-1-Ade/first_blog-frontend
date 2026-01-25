"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push("/admin");
        }, 1500);
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-serif text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                    Enter your information to get started
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none">Full Name</label>
                        <Input id="name" placeholder="Grace Williams" required disabled={isLoading} />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                        <Input id="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                        <Input id="password" type="password" required disabled={isLoading} />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}
