import { useState } from "react";
import { PriceCalculatorForm } from "@/components/PriceCalculatorForm";
import { ProviderComparisonTable } from "@/components/ProviderComparisonTable";
import { CostChart } from "@/components/CostChart";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProviderPrice {
  provider: string;
  providerName: string;
  unitPrice: number;
  totalCost: number;
  isBestPrice: boolean;
}

interface ComparisonResult {
  service: string;
  quantity: number;
  providers: ProviderPrice[];
  chartData: Array<{ name: string; value: number }>;
}

export default function Calculator() {
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Reset function to clear all results
  const handleReset = () => {
    setResult(null);
  };

  // Calculate prices for all three providers simultaneously
  const handleCalculate = async (formData: any) => {
    // Guard against invalid inputs
    if (!formData.service || !formData.quantity) {
      return;
    }
    
    const quantity = parseFloat(formData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      return;
    }
    
    setIsCalculating(true);
    
    // TODO: Remove mock functionality - replace with real API call to /api/calculate
    // This simulates API delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock pricing data for all providers and services
    const mockPricing: Record<string, Record<string, number>> = {
      aws: { compute: 0.023, storage: 0.025, database: 0.045 },
      gcp: { compute: 0.020, storage: 0.023, database: 0.042 },
      azure: { compute: 0.024, storage: 0.026, database: 0.046 },
    };
    
    // Safely access pricing with fallback
    const awsPrice = mockPricing.aws?.[formData.service] || 0;
    const gcpPrice = mockPricing.gcp?.[formData.service] || 0;
    const azurePrice = mockPricing.azure?.[formData.service] || 0;
    
    // Calculate prices for all three providers
    const providerResults: ProviderPrice[] = [
      {
        provider: 'aws',
        providerName: 'Amazon Web Services',
        unitPrice: awsPrice,
        totalCost: awsPrice * quantity,
        isBestPrice: false,
      },
      {
        provider: 'gcp',
        providerName: 'Google Cloud Platform',
        unitPrice: gcpPrice,
        totalCost: gcpPrice * quantity,
        isBestPrice: false,
      },
      {
        provider: 'azure',
        providerName: 'Microsoft Azure',
        unitPrice: azurePrice,
        totalCost: azurePrice * quantity,
        isBestPrice: false,
      },
    ];
    
    // Find the provider with the lowest cost and mark it as best price
    const lowestCost = Math.min(...providerResults.map(p => p.totalCost));
    providerResults.forEach(provider => {
      if (provider.totalCost === lowestCost) {
        provider.isBestPrice = true;
      }
    });
    
    // Prepare chart data for visualization
    const chartData = providerResults.map(p => ({
      name: p.providerName.split(' ')[0], // Shortened names for chart
      value: p.totalCost,
    }));
    
    const serviceNames: Record<string, string> = {
      compute: 'Compute',
      storage: 'Storage',
      database: 'Database',
    };
    
    setResult({
      service: serviceNames[formData.service] || formData.service,
      quantity,
      providers: providerResults,
      chartData,
    });
    
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Multi-Cloud Price Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Compare prices across AWS, GCP, and Azure instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Calculator form - sticky on larger screens */}
          <div className="lg:sticky lg:top-24 h-fit">
            <PriceCalculatorForm 
              onCalculate={handleCalculate} 
              onReset={handleReset}
              isCalculating={isCalculating} 
            />
          </div>

          {/* Results section with loading state */}
          <div className="space-y-8">
            {isCalculating ? (
              <Card className="p-12 flex flex-col items-center justify-center gap-4 animate-scale-in">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Calculating prices across all providers...</p>
              </Card>
            ) : result ? (
              <>
                {/* Provider comparison table with best price highlighting */}
                <ProviderComparisonTable 
                  service={result.service}
                  quantity={result.quantity}
                  providers={result.providers}
                />
                
                {/* Visual charts for cost comparison */}
                <div className="grid md:grid-cols-2 gap-6 animate-slide-up animate-delay-200">
                  <CostChart data={result.chartData} type="bar" />
                  <CostChart data={result.chartData} type="pie" />
                </div>
              </>
            ) : (
              <Card className="p-12 text-center animate-fade-in">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">Ready to Compare</h3>
                  <p className="text-muted-foreground">
                    Fill out the form and click "Compare Prices" to see cost estimates from all major cloud providers
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
