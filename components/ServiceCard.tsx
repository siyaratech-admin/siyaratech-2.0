import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  category: string;
  isPopular?: boolean;
  onLearnMore?: () => void;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  category,
  isPopular = false,
  onLearnMore
}: ServiceCardProps) {
  return (
    <Card className={`relative group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-border/20 bg-card/80 backdrop-blur-sm glass-card-hover glass-highlight ${
      isPopular ? 'ring-2 ring-primary/30' : ''
    }`}>
      
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-brand-gradient text-white text-center py-2 text-sm font-medium z-10">
          Most Popular
        </div>
      )}
      
      <CardContent className={`relative p-8 ${isPopular ? 'pt-14' : ''}`}>
        {/* Icon and Category */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Icon className="w-8 h-8 text-primary relative z-10" />
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent/50 text-accent-foreground border-border/50">
            {category}
          </Badge>
        </div>

        {/* Title and Description */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-base">
            {description}
          </p>
        </div>

        {/* Features as Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {features.map((feature, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-sm px-3 py-1 bg-background/50 border-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              {feature}
            </Badge>
          ))}
        </div>

        {/* View Details Button */}
        <Button 
          variant="ghost" 
          className="w-full justify-between group/btn text-foreground hover:text-primary-foreground hover:bg-brand-gradient transition-all duration-300 py-6 text-base font-medium"
          onClick={onLearnMore}
        >
          <span>View Details</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
        </Button>
      </CardContent>
    </Card>
  );
}