"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import BlogCard from '@/components/BlogCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function BlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs');

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await response.json();
        setBlogs(data.blogs);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="pt-16">
      <PageHeader
        title="Blog & Insights"
        subtitle="Stay Ahead of the Curve"
        description="Discover the latest trends, best practices, and expert insights in technology, AI, and digital transformation."
        badge="Latest Updates"
      />

      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading blogs...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}

          {/* Blogs Content */}
          {!loading && !error && blogs.length > 0 && (
            <>
              {/* Featured Blog */}
              {featuredBlog && (
                <div className="mb-16">
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                    Featured Article
                  </Badge>
                  <Card
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => router.push(`/blog/${featuredBlog.id}`)}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                          <Image
                            src={featuredBlog.image}
                            alt={featuredBlog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600';
                            }}
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8">
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {featuredBlog.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                          {featuredBlog.description}
                        </p>
                        <Button
                          className="hover:scale-105 transition-transform duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/blog/${featuredBlog.id}`);
                          }}
                        >
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Blog Grid */}
              {otherBlogs.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherBlogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* No Blogs State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No blogs available at the moment.</p>
              <Button onClick={() => window.location.reload()}>
                Refresh
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}