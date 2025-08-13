"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  name: string;
  title: string;
  content: string;
  contentType: string;
  contentMd: string;
  publishedOn: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${params.name}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog post not found');
          } else {
            setError('Failed to load blog post');
          }
          return;
        }
        
        const data = await response.json();
        setBlogPost(data.blogPost);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (params.name) {
      fetchBlogPost();
    }
  }, [params.name]);

  const renderContent = () => {
    if (!blogPost) return null;

    if (blogPost.contentType === 'Markdown' && blogPost.contentMd) {
      return (
        <div className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:text-foreground prose-p:text-muted-foreground 
            prose-strong:text-foreground prose-code:text-foreground
            prose-pre:bg-muted prose-pre:text-foreground
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            prose-a:text-primary hover:prose-a:text-primary/80"
        >
          <ReactMarkdown>
            {blogPost.contentMd}
          </ReactMarkdown>
        </div>
      );
    } else {
      return (
        <div 
          className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:text-foreground prose-p:text-muted-foreground 
            prose-strong:text-foreground prose-code:text-foreground
            prose-pre:bg-muted prose-pre:text-foreground
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            prose-a:text-primary hover:prose-a:text-primary/80"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading blog post...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {error === 'Blog post not found' ? '404 - Blog Post Not Found' : 'Error'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {error === 'Blog post not found' 
                ? 'The blog post you are looking for does not exist or has been removed.'
                : error
              }
            </p>
            <div className="space-x-4">
              <Button onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button variant="outline" onClick={() => router.push('/blog')}>
                View All Blogs
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return null;
  }

  return (
    <div className="pt-16 min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-accent"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            {blogPost.title}
          </h1>
          
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <time dateTime={blogPost.publishedOn}>
              Published on {formatDate(blogPost.publishedOn)}
            </time>
          </div>
        </header>

        {/* Article Content */}
        <div className="mb-12">
          {renderContent()}
        </div>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
            <Button onClick={() => router.push('/blog')}>
              View All Blogs
            </Button>
          </div>
        </footer>
      </article>
    </div>
  );
}
