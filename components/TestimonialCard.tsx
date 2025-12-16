import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  content,
  rating,
  avatar
}: TestimonialCardProps) {
  return (
    <Card className="relative group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/20 glass-card-hover glass-highlight">
      <CardContent className="p-8">
        {/* Quote Icon */}
        <div className="flex justify-between items-start mb-6">
          <Quote className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors duration-300" />
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating
                  ? 'text-primary fill-current'
                  : 'text-muted-foreground'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <blockquote className="text-foreground mb-8 text-lg leading-relaxed italic">
          &quot;{content}&quot;
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {name}
            </h4>
            <p className="text-muted-foreground text-sm">
              {role} at {company}
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </CardContent>
    </Card>
  );
}