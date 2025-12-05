"use client";
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { useRouter } from 'next/navigation';

interface Blog {
    id: string;
    title: string;
    description: string;
    image: string;
}

export default function BlogSection() {
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

    return (
        <section id="blog" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-primary/5 px-4 py-2">
                        Latest Insights
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        From Our <span className="text-primary">Blog</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Discover the latest trends, best practices, and expert insights in technology, AI, and digital transformation.
                    </p>
                </div>

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

                {/* Blogs Grid */}
                {!loading && !error && blogs.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {blogs.slice(0, 3).map((blog) => (
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

                {!loading && !error && blogs.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">No blogs found.</p>
                    </div>
                )}

                <div className="text-center">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => router.push('/blog')}
                        className="rounded-full px-8 h-12 text-base hover:bg-primary/5"
                    >
                        View All Articles
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
