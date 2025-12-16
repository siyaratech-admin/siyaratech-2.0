import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  className?: string;
}

export default function BlogCard({ id, title, description, image, className = '' }: BlogCardProps) {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/blog/${id}`);
  };

  return (
    <Card className={`group overflow-hidden border-border/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${className}`} onClick={handleReadMore}>
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to a placeholder image if the image fails to load
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600';
          }}
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        <Button
          variant="ghost"
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleReadMore();
          }}
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
