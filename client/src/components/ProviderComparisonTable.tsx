import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Cloud } from "lucide-react";

interface ProviderPrice {
  provider: string;
  providerName: string;
  unitPrice: number;
  totalCost: number;
  isBestPrice: boolean;
}

interface ProviderComparisonTableProps {
  service: string;
  quantity: number;
  providers: ProviderPrice[];
}

// Component displays comparison of prices across all cloud providers
export function ProviderComparisonTable({ service, quantity, providers }: ProviderComparisonTableProps) {
  // Map provider codes to brand colors for visual distinction
  const providerColors: Record<string, string> = {
    aws: 'text-orange-500',
    gcp: 'text-blue-500',
    azure: 'text-cyan-500',
  };

  return (
    <Card className="overflow-hidden animate-slide-up animate-delay-100">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold">Provider Comparison</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Comparing {service} prices across all providers
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs font-semibold uppercase tracking-wider">Provider</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Unit Price</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Quantity</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Total Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider, index) => {
            const iconColor = providerColors[provider.provider] || 'text-muted-foreground';
            
            return (
              <TableRow 
                key={provider.provider} 
                className={`hover-elevate transition-all ${provider.isBestPrice ? 'bg-chart-2/10' : ''}`}
                data-testid={`row-provider-${provider.provider}`}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Cloud className={`h-5 w-5 ${iconColor}`} />
                    <span>{provider.providerName}</span>
                    {/* Best price badge with icon - highlights the most cost-effective option */}
                    {provider.isBestPrice && (
                      <Badge 
                        variant="outline" 
                        className="ml-2 bg-chart-2/20 text-chart-2 border-chart-2/50"
                        data-testid={`badge-best-price-${provider.provider}`}
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Best Price
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">${provider.unitPrice.toFixed(4)}</TableCell>
                <TableCell className="text-right font-mono">{quantity}</TableCell>
                <TableCell 
                  className={`text-right font-mono font-semibold ${provider.isBestPrice ? 'text-chart-2 text-lg' : ''}`}
                  data-testid={`text-cost-${provider.provider}`}
                >
                  ${provider.totalCost.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
