import { FeatureCard } from '../FeatureCard';
import { DollarSign } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <FeatureCard
      icon={DollarSign}
      title="Accurate Pricing"
      description="Get precise cost estimates based on real cloud provider pricing models."
    />
  );
}
