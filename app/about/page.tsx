"use client";
import React from 'react';
import Image from "next/image";
import PageHeader from '@/components/PageHeader';
import AboutSection from '@/components/AboutSection';

export default function AboutPage() {
  return (
    <div className="pt-16">
      <PageHeader
        title="About Siyaratech"
        subtitle="Innovation Driven by Purpose"
        description="We're a team of passionate technologists, strategists, and innovators dedicated to helping businesses thrive in the digital age."
        badge="Who We Are"
      />
      <AboutSection />
    </div>
  );
}