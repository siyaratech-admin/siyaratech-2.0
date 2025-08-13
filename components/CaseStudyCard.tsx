import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  improvement: string;
}

interface CaseStudyCardProps {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  result: string;
  metrics: Metric[];
  image: string;
  tags: string[];
  onReadMore?: () => void;
}

export default function CaseStudyCard({
  title,
  client,
  industry,
  challenge,
  result,
  metrics,
  image,
  tags,
  onReadMore
}: CaseStudyCardProps) {
  return (
    <Card className="relative group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/20 glass-card-hover glass-highlight">
      {/* Image Header */}
      <div className="aspect-video overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 text-primary-foreground border-0">
            {industry}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-200 text-sm">{client}</p>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs bg-background/50 border-border/30 hover:bg-primary/10 hover:border-primary/30 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Challenge */}
        <div className="mb-4">
          <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{challenge}</p>
        </div>

        {/* Result */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-2">Result</h4>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{result}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="text-center p-3 bg-background/30 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-primary mr-1" />
                <span className="font-bold text-primary">{metric.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="text-xs text-green-500">{metric.improvement}</p>
            </div>
          ))}
        </div>

        {/* Read More Button */}
        <Button 
          variant="ghost" 
          className="w-full justify-between group/btn hover:bg-brand-gradient hover:text-white transition-all duration-300"
          onClick={onReadMore}
        >
          <span>Read Full Case Study</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}