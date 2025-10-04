import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { DollarSign, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero section with animated entrance */}
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold animate-slide-down">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Cloud Price Calculator
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-100">
            Calculate and compare costs across AWS, GCP, and Azure. Get instant estimates for compute, storage, and database services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-slide-up animate-delay-200">
            <Link href="/calculator">
              <Button size="lg" className="h-12 px-8 transition-all hover-scale" data-testid="button-start-calculating">
                Start Calculating
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="lg" 
              className="h-12 px-8 transition-all"
              data-testid="link-view-pricing"
            >
              View Pricing Data
            </Button>
          </div>
        </div>
      </section>

      {/* Features section with staggered animations */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 animate-fade-in">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-slide-up">
              <FeatureCard
                icon={DollarSign}
                title="Accurate Pricing"
                description="Get precise cost estimates based on real cloud provider pricing models across multiple services."
              />
            </div>
            <div className="animate-slide-up animate-delay-100">
              <FeatureCard
                icon={Zap}
                title="Instant Calculations"
                description="Real-time cost calculations with immediate results. No waiting, no complexity."
              />
            </div>
            <div className="animate-slide-up animate-delay-200">
              <FeatureCard
                icon={BarChart3}
                title="Visual Analytics"
                description="Understand your costs with interactive charts and detailed breakdown tables."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
