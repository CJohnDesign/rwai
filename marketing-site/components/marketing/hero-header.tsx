"use client"

import { HeroForceGraph } from "./d3-force-graph/components/hero-force-graph"
import { Button } from "@/components/ui/button"

interface HeroHeaderProps {
  className?: string
  title?: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
}

export function HeroHeader({
  className,
  title = "Revolutionize Your Workflow with AI",
  subtitle = "Harness the power of advanced AI technology to transform your development process. Build smarter, faster, and more efficiently.",
  ctaText = "Get Started",
  onCtaClick,
}: HeroHeaderProps) {
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-background">
      <div className="container mx-auto px-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 py-12 lg:py-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
              {subtitle}
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                onClick={onCtaClick}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {ctaText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column - Force Graph */}
          <div className="relative h-full min-h-[500px] lg:min-h-[700px]">
            <div className="absolute inset-0 lg:-right-[20%]">
              <HeroForceGraph 
                height="100%" 
                width="120%" 
                backgroundColor="bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  )
} 