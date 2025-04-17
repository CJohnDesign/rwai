"use client";

import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "../../../components/ui/card";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  FileText, 
  Book, 
  ChevronRight, 
  Mail, 
  Phone 
} from "lucide-react";
import Link from "next/link";
import { WhitelistOverlay } from "../../../components/app-dashboard/whitelist-overlay";

// Common questions for FAQ section
const faqQuestions = [
  {
    question: "How do I get started with RWAi?",
    answer: "To get started, create an account and follow our quick start guide in the documentation section."
  },
  {
    question: "How does billing work?",
    answer: "We charge based on usage. You can view your current usage and billing details in the Usage & Billing section."
  },
  {
    question: "Can I use my own models?",
    answer: "Yes, you can upload and use your own models. Visit the Models section to learn more."
  },
  {
    question: "How do I connect to the API?",
    answer: "You can find API documentation and connection details in the Documentation section."
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Toggle FAQ item expansion
  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search for help topics..."
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              <span>Documentation</span>
            </CardTitle>
            <CardDescription>
              Browse our detailed documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Find comprehensive guides and reference materials for all RWAi features and services.
            </p>
          </CardContent>
          <CardFooter>
            <Link 
              href="/help/documentation" 
              className="text-sm text-primary hover:underline flex items-center"
            >
              View Documentation
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>Community</span>
            </CardTitle>
            <CardDescription>
              Join our community forums
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Connect with other users, share experiences, and get help from the RWAi community.
            </p>
          </CardContent>
          <CardFooter>
            <Link 
              href="/help/community" 
              className="text-sm text-primary hover:underline flex items-center"
            >
              Visit Community
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Tutorials</span>
            </CardTitle>
            <CardDescription>
              Step-by-step guides and tutorials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Learn how to use RWAi effectively with our detailed tutorials and walkthroughs.
            </p>
          </CardContent>
          <CardFooter>
            <Link 
              href="/help/tutorials" 
              className="text-sm text-primary hover:underline flex items-center"
            >
              View Tutorials
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {faqQuestions.map((faq, index) => (
                <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronRight 
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        expandedFaq === index ? "rotate-90" : ""
                      }`} 
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our support team typically responds within 24 hours.
                  </p>
                  <a 
                    href="mailto:support@rwai.xyz" 
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                  >
                    support@rwai.xyz
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Available Monday-Friday, 9am-5pm EST.
                  </p>
                  <a 
                    href="tel:+18005551234" 
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                  >
                    +1 (800) 555-1234
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Whitelist Overlay */}
      <WhitelistOverlay />
    </div>
  );
} 