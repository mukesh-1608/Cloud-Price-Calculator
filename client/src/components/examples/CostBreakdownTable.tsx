import { CostBreakdownTable } from '../CostBreakdownTable';

export default function CostBreakdownTableExample() {
  const mockItems = [
    { service: 'AWS Compute (EC2)', quantity: 100, unitPrice: 0.023, totalCost: 2.30 },
    { service: 'AWS Storage (S3)', quantity: 500, unitPrice: 0.025, totalCost: 12.50 },
  ];

  return <CostBreakdownTable items={mockItems} totalCost={14.80} />;
}
