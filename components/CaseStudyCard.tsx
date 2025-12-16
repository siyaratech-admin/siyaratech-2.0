import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
  metrics,
  image,
  tags,
  onReadMore
}: CaseStudyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card
        onClick={onReadMore}
        className="group relative h-full overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
      >
        {/* Image Header with Overlay */}
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />

          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground border-0 backdrop-blur-md shadow-lg">
              {industry}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 line-clamp-2 drop-shadow-md">{title}</h3>
            <p className="text-gray-300 text-sm font-medium">{client}</p>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col flex-grow relative z-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs py-1 px-2 border-primary/20 bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs py-1 px-2 border-primary/20 bg-primary/5 text-muted-foreground">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Challenge & Result - Condensed on smaller screens, expanded logic could be added */}
          <div className="space-y-4 mb-6 flex-grow">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Challenge</span>
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">{challenge}</p>
            </div>
            {/* <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Result</span>
                <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">{result}</p>
            </div> */}
          </div>

          {/* Key Metrics - Highlighted */}
          <div className="grid grid-cols-2 gap-3 mb-6 bg-secondary/20 rounded-xl p-3 border border-secondary/30">
            {metrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="font-bold text-lg text-foreground tracking-tight">{metric.value}</span>
                </div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Read More Button */}
          <div className="mt-auto pt-2">
            <Button
              variant="default"
              size="sm"
              className="w-full justify-between group/btn bg-primary/90 hover:bg-primary shadow-md hover:shadow-primary/20 transition-all duration-300"
            >
              <span className="font-semibold">View Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </CardContent>

        {/* Hover Highlight Effect */}
        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg transition-colors duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
}