"use client";
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Loader2,
  X,
  MessageCircleHeart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  description: string;
  budget: string;
}

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  serviceInterest: 'Web Development',
  description: '',
  budget: "Let's discuss",
};

function ThankYouDialog({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="card"
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-4 max-w-md w-full rounded-2xl bg-background border border-border/60 shadow-2xl p-10 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-1 flex items-center justify-center shadow-lg">
              <MessageCircleHeart className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-2xl font-bold mb-3"
          >
            Thank You for Contacting Us!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-muted-foreground mb-8 leading-relaxed"
          >
            We&apos;ve received your message and will approach you shortly.
            Our team typically responds within{' '}
            <span className="font-semibold text-foreground">2 business hours</span>.
          </motion.p>

          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--chart-1))',
                top: `${10 + (i * 13) % 70}%`,
                left: i < 3 ? `${5 + i * 6}%` : `${75 + (i - 3) * 7}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.6] }}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.6 }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-primary to-chart-1 text-primary-foreground px-8 hover:scale-105 transition-transform duration-200"
            >
              Done
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showDialog, setShowDialog] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(EMPTY_FORM);
        setShowDialog(true);
      } else {
        console.error('Submission failed:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {showDialog && <ThankYouDialog onClose={() => setShowDialog(false)} />}

      <HeroSection
        title="Get In Touch"
        description="Ready to transform your business? We'd love to hear about your project and discuss how we can help you achieve your goals."
        primaryCTA="Schedule Call"
        onPrimaryCTA={() => {}}
        showStats={false}
      />

      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* ── Contact Form ── */}
            <Card id="send-message" className="p-8 border-border/50 hover:shadow-xl transition-all duration-300 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <span className="font-medium text-red-800">
                    Failed to send message. Please try again.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="transition-all duration-300 focus:scale-[1.02]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="transition-all duration-300 focus:scale-[1.02]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    className="transition-all duration-300 focus:scale-[1.02]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 99999 99999"
                    className="transition-all duration-300 focus:scale-[1.02]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="transition-all duration-300 focus:scale-[1.02]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Interest</label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-border rounded-lg bg-background transition-all duration-300 focus:scale-[1.02]"
                  >
                    <option>Web Development</option>
                    <option>AI Solutions</option>
                    <option>Digital Transformation</option>
                    <option>Consulting</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="transition-all duration-300 focus:scale-[1.02]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-border rounded-lg bg-background transition-all duration-300 focus:scale-[1.02]"
                  >
                    <option>$10k - $25k</option>
                    <option>$25k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k+</option>
                    <option>Let&apos;s discuss</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-chart-1 text-primary-foreground hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* ── Contact Information ── */}
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <Mail className="w-6 h-6 text-primary mt-1 mr-4 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                        support@siyaratechin.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <MapPin className="w-6 h-6 text-primary mt-1 mr-4 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <div className="font-medium">Headquarters</div>
                      <div className="text-muted-foreground">Nashik Road,</div>
                      <div className="text-muted-foreground">Nashik, Maharashtra, 422101</div>
                      <div className="mt-4">
                        <div className="font-medium">Corporate Office</div>
                        <div className="text-muted-foreground">Prabhat Road,</div>
                        <div className="text-muted-foreground">Pune, 411004</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-chart-1/5 border-primary/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="font-medium">Quick Response Guaranteed</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We respond to all inquiries within 2 hours during business hours and
                    within 24 hours on weekends.
                  </p>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}