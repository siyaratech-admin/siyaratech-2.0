"use client";
import React from 'react';
import { caseStudies as allCaseStudies } from '@/lib/caseStudies';
import PageHeader from '@/components/PageHeader';
import CaseStudyCard from '@/components/CaseStudyCard';

import { useRouter } from 'next/navigation';

export default function CaseStudiesPage() {
  const router = useRouter();

  const caseStudies = allCaseStudies;

  return (
    <div className="pt-16">
      <PageHeader
        title="Case Studies"
        subtitle="Proven Success Stories"
        description="Explore real-world examples of how we've helped businesses transform their operations and achieve remarkable growth through technology."
        badge="Success Stories"
      />

      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard
                key={index}
                {...caseStudy}
                onReadMore={() => router.push(`/case-studies/${caseStudy.slug}`)}
              />
            ))}
          </div>

          {/* Results Summary */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8">Overall Results</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { metric: '300%', label: 'Average Efficiency Increase' },
                { metric: '$50M+', label: 'Client Cost Savings' },
                { metric: '99.9%', label: 'Average System Uptime' },
                { metric: '100%', label: 'Project Success Rate' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-200">{stat.metric}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}