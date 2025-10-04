import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Feature card with smooth hover animation and scale effect
export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-8 hover-elevate hover-scale transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center transition-transform">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
