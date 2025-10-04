import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CostItem {
  service: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
}

interface CostBreakdownTableProps {
  items: CostItem[];
  totalCost: number;
}

// Enhanced cost breakdown table with smooth animations
export function CostBreakdownTable({ items, totalCost }: CostBreakdownTableProps) {
  return (
    <Card className="overflow-hidden animate-slide-up transition-all">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold">Cost Breakdown</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Service</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Quantity</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Unit Price</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index} className="hover-elevate transition-all" data-testid={`row-cost-${index}`}>
                <TableCell className="font-medium">{item.service}</TableCell>
                <TableCell className="text-right font-mono">{item.quantity}</TableCell>
                <TableCell className="text-right font-mono">${item.unitPrice.toFixed(4)}</TableCell>
                <TableCell className="text-right font-mono font-semibold" data-testid={`text-item-cost-${index}`}>
                  ${item.totalCost.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-t-2 border-primary bg-accent/50">
              <TableCell colSpan={3} className="font-bold text-lg">Total Cost</TableCell>
              <TableCell className="text-right font-mono font-bold text-2xl text-primary" data-testid="text-total-cost">
                ${totalCost.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
