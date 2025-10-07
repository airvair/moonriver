"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { BloggerPost, BloggerApiError } from "@/lib/types/blogger";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;

  const [post, setPost] = useState<BloggerPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/blog/${postId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }

      const data: BloggerPost | BloggerApiError = await response.json();

      if ("error" in data) {
        throw new Error(data.error);
      }

      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  // Helper to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'TanNimbus';
          src: url('/fonts/tan-nimbus.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        /* Blog content styling */
        .blog-content {
          line-height: 1.8;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          font-family: 'TanNimbus', sans-serif;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .blog-content h1 { font-size: 2.5rem; }
        .blog-content h2 { font-size: 2rem; }
        .blog-content h3 { font-size: 1.75rem; }
        .blog-content h4 { font-size: 1.5rem; }

        .blog-content p {
          margin-bottom: 1.5rem;
        }

        .blog-content a {
          color: #AE8625;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .blog-content a:hover {
          color: #D2AC47;
        }

        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
        }

        .blog-content blockquote {
          border-left: 4px solid #AE8625;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }

        .blog-content code {
          background: hsl(var(--muted));
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }

        .blog-content pre {
          background: hsl(var(--muted));
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .blog-content pre code {
          background: transparent;
          padding: 0;
        }
      `}</style>
      <SiteHeader />
      <main className="flex flex-col">
        {loading && (
          <section className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-64 h-64 object-contain"
              >
                <source src="/dog_hare_animation.webm" type="video/webm" />
              </video>
              <span className="text-lg text-muted-foreground">Loading post...</span>
            </div>
          </section>
        )}

        {error && (
          <section className="min-h-screen flex items-center justify-center bg-background">
            <div className="container mx-auto px-4">
              <Card className="max-w-md mx-auto border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6 text-center">
                  <p className="text-destructive mb-4">{error}</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={() => fetchPost()}
                      variant="outline"
                      className="border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                    <Button
                      onClick={() => router.push("/blog")}
                      variant="outline"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Blog
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {!loading && !error && post && (
          <>
            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-secondary/20 to-background">
              <div className="container mx-auto px-4 py-24 relative z-10">
                <div className="max-w-4xl mx-auto">
                  <Button
                    asChild
                    variant="ghost"
                    className="mb-6 text-[#AE8625] hover:text-[#926F34] hover:bg-[#AE8625]/10"
                  >
                    <Link href="/blog">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Blog
                    </Link>
                  </Button>

                  {post.labels && post.labels.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {post.labels.map((label) => (
                        <Badge
                          key={label}
                          variant="secondary"
                          className="bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20 text-[#926F34]"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <h1
                    className="text-4xl md:text-6xl font-bold mb-6"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 justify-center text-muted-foreground">
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author.displayName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.published)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Post Content */}
            <section className="py-16 bg-background">
              <div className="container mx-auto px-4">
                <article className="max-w-4xl mx-auto">
                  <Card className="bg-card/50 backdrop-blur">
                    <CardContent className="p-8 md:p-12">
                      <div
                        className="blog-content prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="mt-12 flex justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white"
                    >
                      <Link href="/blog">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to All Posts
                      </Link>
                    </Button>
                  </div>
                </article>
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}
