"use client";
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Calendar,
  Loader2
} from 'lucide-react';

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

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: 'Web Development',
    description: '',
    budget: 'Let\'s discuss'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Contact Response:', result.contact);
        console.log('Lead Response:', result.lead);
        
        setSubmitStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          serviceInterest: 'Web Development',
          description: '',
          budget: 'Let\'s discuss'
        });
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
      <HeroSection
        title="Get In Touch"
        subtitle="Let's Build Something Amazing Together"
        description="Ready to transform your business? We'd love to hear about your project and discuss how we can help you achieve your goals."
        primaryCTA="Schedule Call"
        onPrimaryCTA={() => {}}
        showStats={false}
      />

      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 border-border/50 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-800">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center text-red-800">
                    <span className="font-medium">Failed to send message. Please try again.</span>
                  </div>
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
                    placeholder="+1 (555) 123-4567" 
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

            {/* Contact Information */}
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <Mail className="w-6 h-6 text-primary mt-1 mr-4 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">hello@futuretech.com</div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">support@futuretech.com</div>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <Phone className="w-6 h-6 text-primary mt-1 mr-4 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">+1 (555) 123-4567</div>
                      <div className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">+1 (555) 765-4321</div>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <MapPin className="w-6 h-6 text-primary mt-1 mr-4 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <div className="font-medium">Offices</div>
                      <div className="text-muted-foreground">San Francisco, CA</div>
                      <div className="text-muted-foreground">New York, NY</div>
                      <div className="text-muted-foreground">London, UK</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <div className="grid gap-4">
                  <Button variant="outline" className="justify-start hover:scale-105 transition-transform duration-200">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule 30-min Consultation
                  </Button>
                  <Button variant="outline" className="justify-start hover:scale-105 transition-transform duration-200">
                    <Star className="w-4 h-4 mr-2" />
                    Request Project Quote
                  </Button>
                  <Button variant="outline" className="justify-start hover:scale-105 transition-transform duration-200">
                    <Globe className="w-4 h-4 mr-2" />
                    Download Service Brochure
                  </Button>
                </div>
              </div>

              {/* Response Time */}
              <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-chart-1/5 border-primary/20 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="font-medium">Quick Response Guaranteed</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We respond to all inquiries within 2 hours during business hours and within 24 hours on weekends.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}