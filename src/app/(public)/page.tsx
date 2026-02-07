import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/features/blog-card";
import { FadeIn, StaggerChildren, CardFadeIn } from "@/components/animations/fade-in";
import { mockPosts, mockCategories } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const publishedPosts = mockPosts.filter((post) => post.status === "published");
  const featuredPosts = publishedPosts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-primary">
                Walking by Faith, <br className="hidden md:inline" /> Not by Sight.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-muted-foreground md:text-2xl font-light leading-relaxed">
                A sanctuary for reflection, biblical wisdom, and encouragement for your daily walk with God.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="pt-4 flex justify-center gap-4">
              <Link href="/blog">
                <Button size="lg" className="rounded-full px-8">
                  Start Reading
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Our Mission
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
        {/* Background Decorative Elements could go here */}
      </section>

      {/* Featured Posts */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b pb-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-serif text-primary">Latest Reflections</h2>
              <p className="text-muted-foreground">New writings to encourage your spirit.</p>
            </div>
            <Link href="/blog">
              <Button variant="ghost" className="group">
                View all posts <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <CardFadeIn key={post.id}>
                <BlogCard post={post} />
              </CardFadeIn>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-serif text-primary">Explore Topics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive into specific areas of faith and life.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {mockCategories.map((category) => (
              <Link key={category.id} href={`/blog?category=${category.slug}`}>
                <div className="px-6 py-3 bg-card hover:bg-white shadow-sm hover:shadow-md rounded-lg border transition-all text-primary font-medium">
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Join Our Community</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg">
            Receive weekly encouragement and updates directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background/10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-primary-foreground"
            />
            <Button variant="secondary" className="whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
