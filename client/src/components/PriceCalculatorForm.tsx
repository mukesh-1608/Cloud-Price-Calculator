import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calculator, RotateCcw, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FormData {
  service: string;
  quantity: string;
  region: string;
}

interface PriceCalculatorFormProps {
  onCalculate: (data: FormData) => void;
  onReset?: () => void;
  isCalculating?: boolean;
}

export function PriceCalculatorForm({ onCalculate, onReset, isCalculating = false }: PriceCalculatorFormProps) {
  const [formData, setFormData] = useState<FormData>({
    service: "",
    quantity: "",
    region: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields before submission
    if (!formData.service || !formData.quantity) {
      return;
    }
    
    const quantity = parseFloat(formData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      return;
    }
    
    onCalculate(formData);
  };

  const handleReset = () => {
    setFormData({
      service: "",
      quantity: "",
      region: "",
    });
    // Notify parent component to clear results
    if (onReset) {
      onReset();
    }
  };

  // Check if form is valid for submission
  const isFormValid = formData.service && formData.quantity && parseFloat(formData.quantity) > 0;

  return (
    <Card className="p-8 animate-slide-up hover-scale">
      <h2 className="text-2xl font-semibold mb-6">Configure Your Cloud Resources</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Type Field with Tooltip */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="service" className="text-sm font-medium">
              Service Type
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0"
                  aria-label="Service type information"
                >
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Choose the type of cloud service: Compute for virtual machines, Storage for object storage, or Database for managed databases.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={formData.service}
            onValueChange={(value) => setFormData({ ...formData, service: value })}
          >
            <SelectTrigger id="service" className="h-12 transition-all" data-testid="select-service">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compute">Compute (VM/Instances)</SelectItem>
              <SelectItem value="storage">Object Storage</SelectItem>
              <SelectItem value="database">Managed Database</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quantity Field with Tooltip */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantity (hours or GB)
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0"
                  aria-label="Quantity information"
                >
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Enter the amount of resources: hours for compute/database services or GB for storage services.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="quantity"
            type="number"
            min="1"
            placeholder="Enter quantity"
            className="h-12 font-mono text-lg transition-all"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            data-testid="input-quantity"
          />
        </div>

        {/* Region Field with Tooltip */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="region" className="text-sm font-medium">
              Region (Optional)
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0"
                  aria-label="Region information"
                >
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Select the geographic region. Some providers may have regional pricing differences.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={formData.region}
            onValueChange={(value) => setFormData({ ...formData, region: value })}
          >
            <SelectTrigger id="region" className="h-12 transition-all" data-testid="select-region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us-east">US East</SelectItem>
              <SelectItem value="us-west">US West</SelectItem>
              <SelectItem value="eu-west">EU West</SelectItem>
              <SelectItem value="ap-south">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            className="flex-1 h-12 transition-all" 
            disabled={isCalculating || !isFormValid}
            data-testid="button-calculate"
          >
            <Calculator className="mr-2 h-5 w-5" />
            {isCalculating ? "Calculating..." : "Compare Prices"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 px-6 transition-all"
            onClick={handleReset}
            data-testid="button-reset"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
