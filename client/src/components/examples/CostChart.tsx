import { CostChart } from '../CostChart';

export default function CostChartExample() {
  const mockData = [
    { name: 'Compute', value: 45 },
    { name: 'Storage', value: 30 },
    { name: 'Database', value: 25 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <CostChart data={mockData} type="bar" />
      <CostChart data={mockData} type="pie" />
    </div>
  );
}
