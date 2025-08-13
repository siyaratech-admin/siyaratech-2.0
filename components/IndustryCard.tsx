import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface Solution {
  title: string;
  description: string;
}

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  solutions: Solution[];
  category: string;
  backgroundImage: string;
  onViewSolutions?: () => void;
}

export default function IndustryCard({
  icon: Icon,
  title,
  description,
  solutions,
  category,
  backgroundImage,
  onViewSolutions
}: IndustryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="relative group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-border/20 glass-highlight">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/75 transition-all duration-500" />
      
      {/* Glassmorphism Layer */}
      <div className="absolute inset-0 glass-card group-hover:glass-card-hover transition-all duration-500" />
      
      <CardContent className="relative p-8 z-10">
        {/* Icon and Category */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-primary/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Icon className="w-8 h-8 text-white relative z-10" />
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {category}
          </Badge>
        </div>

        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-orange transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/90 leading-relaxed text-base">
            {description}
          </p>
        </div>

        {/* Solutions Preview */}
        <div className="mb-6">
          <div className="space-y-3">
            {solutions.slice(0, isExpanded ? solutions.length : 2).map((solution, index) => (
              <div 
                key={index} 
                className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <h4 className="font-semibold text-white mb-2">{solution.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
          
          {solutions.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 w-full justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Show More Solutions ({solutions.length - 2} more)
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* View Solutions Button */}
        <Button 
          className="w-full justify-between group/btn text-white hover:text-primary-foreground hover:bg-brand-gradient border border-white/30 hover:border-transparent bg-white/10 backdrop-blur-sm hover:backdrop-blur-none transition-all duration-300 py-6 text-base font-medium"
          onClick={onViewSolutions}
        >
          <span>View Solutions</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
        </Button>
      </CardContent>
    </Card>
  );
}