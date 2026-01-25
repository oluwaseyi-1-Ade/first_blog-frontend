"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label"; // I might need to create Label or use standard label. I'll use standard label for now to be safe or create it.
// Actually, creating a quick Label component is better for consistency if I have time, but sticking to standard label with class is faster and less prone to "missing file" errors if I forget.
// I will use standard label with Tailwind classes.

import { Loader2, Save } from "lucide-react";

export default function AdminSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert("Settings saved successfully!");
        }, 1000);
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-serif tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your display name and email address.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none">Display Name</label>
                            <Input defaultValue="Grace Williams" placeholder="Your Name" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none">Email</label>
                            <Input defaultValue="grace@faithblog.com" placeholder="Email" type="email" />
                        </div>
                    </CardContent>
                </Card>

                {/* Password Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Ensure your account is secure with a strong password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none">Current Password</label>
                            <Input type="password" placeholder="********" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none">New Password</label>
                            <Input type="password" placeholder="New Password" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none">Confirm New Password</label>
                            <Input type="password" placeholder="Confirm New Password" />
                        </div>
                    </CardContent>
                </Card>

                {/* General Site Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Site Settings</CardTitle>
                        <CardDescription>Configure general blog settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium">Maintenance Mode</label>
                                <p className="text-sm text-muted-foreground">
                                    Temporarily disable public access to the site.
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* Placeholder toggle */}
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-end gap-4">
                    <Button type="button" variant="outline">Discard Changes</Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                    </Button>
                </div>
            </form>
        </div>
    );
}
