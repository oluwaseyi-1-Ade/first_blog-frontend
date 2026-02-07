import { FadeIn, StaggerChildren } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, BookOpen, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container px-4 md:px-6 mx-auto py-12 md:py-20 space-y-16">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary tracking-tight">
                        Our Mission & Vision
                    </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <p className="text-xl text-muted-foreground font-light leading-relaxed">
                        We are dedicated to providing a digital sanctuary where faith meets daily life.
                        Our goal is to encourage, equip, and inspire believers in their walk with God.
                    </p>
                </FadeIn>
            </div>

            {/* Values Grid */}
            <StaggerChildren className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-xl bg-orange-50/50 dark:bg-muted/10 border border-orange-100/50 dark:border-border">
                    <div className="p-3 bg-white dark:bg-card rounded-full shadow-sm">
                        <Heart className="w-8 h-8 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-bold font-serif">Grace & Love</h3>
                    <p className="text-muted-foreground">
                        Sharing the unconditional love of God and the transformative power of His grace in every story we tell.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-xl bg-blue-50/50 dark:bg-muted/10 border border-blue-100/50 dark:border-border">
                    <div className="p-3 bg-white dark:bg-card rounded-full shadow-sm">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold font-serif">Biblical Truth</h3>
                    <p className="text-muted-foreground">
                        Grounding our reflections in Scripture, seeking wisdom and understanding from the Word of God.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-xl bg-green-50/50 dark:bg-muted/10 border border-green-100/50 dark:border-border">
                    <div className="p-3 bg-white dark:bg-card rounded-full shadow-sm">
                        <Users className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold font-serif">Community</h3>
                    <p className="text-muted-foreground">
                        Building a supportive family of believers who bear one another's burdens and rejoice together.
                    </p>
                </div>
            </StaggerChildren>

            {/* Story Section */}
            <FadeIn delay={0.4}>
                <div className="bg-muted/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                    <div className="space-y-4 flex-1">
                        <h2 className="text-3xl font-bold font-serif text-primary">Our Story</h2>
                        <div className="prose dark:prose-invert text-muted-foreground">
                            <p>
                                Started in 2024, Faith Blog began as a small collection of personal journals.
                                It has since grown into a platform sharing diverse voices and testimonies.
                            </p>
                            <p>
                                We believe that every testimony has the power to spark hope in someone else's darkness.
                                Whether you are on a mountaintop or in a valley, you are welcome here.
                            </p>
                        </div>
                        <div className="pt-4">
                            <Link href="/contact">
                                <Button variant="outline">Contact Us</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-[300px] bg-muted rounded-xl bg-[url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center shadow-lg transform md:rotate-2 hover:rotate-0 transition-transform duration-500" />
                </div>
            </FadeIn>
        </div>
    );
}
