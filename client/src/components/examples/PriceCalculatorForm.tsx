import { PriceCalculatorForm } from '../PriceCalculatorForm';

export default function PriceCalculatorFormExample() {
  const handleCalculate = (data: any) => {
    console.log('Calculate triggered with:', data);
  };

  const handleReset = () => {
    console.log('Reset triggered');
  };

  return <PriceCalculatorForm onCalculate={handleCalculate} onReset={handleReset} />;
}
