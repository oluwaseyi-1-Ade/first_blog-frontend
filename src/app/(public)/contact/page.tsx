"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/animations/fade-in";
import { Loader2, Send, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 1500);
    }

    return (
        <div className="container px-4 md:px-6 mx-auto py-12 md:py-20 max-w-5xl">
            <FadeIn>
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                        Have a question, prayer request, or just want to say hello? We'd love to hear from you.
                    </p>
                </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Contact Info */}
                <FadeIn delay={0.2} className="space-y-8">
                    <div className="bg-muted/30 p-8 rounded-2xl space-y-6">
                        <h3 className="text-xl font-bold font-serif">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <a href="mailto:hello@faithblog.com" className="text-muted-foreground hover:text-primary transition-colors">hello@faithblog.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-muted-foreground">123 Faith Avenue<br />Grace City, GC 45678</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-muted-foreground">(555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-8 rounded-2xl">
                        <h3 className="text-xl font-bold font-serif mb-4">Prayer Requests</h3>
                        <p className="text-muted-foreground mb-4">
                            Our team prays weekly for our community. If you have a specific need, please let us know.
                        </p>
                    </div>
                </FadeIn>

                {/* Contact Form */}
                <FadeIn delay={0.4}>
                    <div className="bg-card border rounded-2xl p-8 shadow-sm">
                        {isSent ? (
                            <div className="text-center py-12 space-y-4">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold font-serif">Message Sent!</h3>
                                <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                                <Button onClick={() => setIsSent(false)} variant="outline">Send Another</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input id="name" placeholder="Your Name" required disabled={isLoading} />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="you@example.com" required disabled={isLoading} />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="How can we help you?"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
