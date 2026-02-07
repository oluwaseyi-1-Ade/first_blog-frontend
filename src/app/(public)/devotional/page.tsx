import { FadeIn } from "@/components/animations/fade-in";

export default function DevotionalPage() {
    return (
        <div className="container px-4 md:px-6 mx-auto py-12 md:py-20 text-center">
            <FadeIn>
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-6">Daily Devotionals</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Daily reflections to start your day with purpose and peace.
                </p>
                <div className="p-12 bg-muted/30 rounded-lg border border-dashed">
                    <p className="text-muted-foreground italic">Coming Soon...</p>
                </div>
            </FadeIn>
        </div>
    );
}
