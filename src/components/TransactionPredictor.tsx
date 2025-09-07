import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionResult {
  prediction: 'fraud' | 'legitimate';
  confidence: number;
  riskScore: number;
  factors: string[];
}

export const TransactionPredictor = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    oldbalanceOrg: '',
    newbalanceOrig: '',
    oldbalanceDest: '',
    newbalanceDest: '',
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    // Validate form
    const requiredFields = ['type', 'amount', 'oldbalanceOrg', 'newbalanceOrig'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate ML prediction with realistic logic
    setTimeout(() => {
      const amount = parseFloat(formData.amount);
      const oldBalanceOrg = parseFloat(formData.oldbalanceOrg);
      const newBalanceOrig = parseFloat(formData.newbalanceOrig);
      const expectedBalance = oldBalanceOrg - amount;
      
      // Risk factors calculation
      let riskScore = 0;
      const factors: string[] = [];
      
      // Amount-based risk
      if (amount > 100000) {
        riskScore += 30;
        factors.push("High transaction amount");
      }
      
      // Balance inconsistency
      if (Math.abs(newBalanceOrig - expectedBalance) > 1000) {
        riskScore += 25;
        factors.push("Balance inconsistency detected");
      }
      
      // Transaction type risk
      if (formData.type === 'TRANSFER' || formData.type === 'CASH_OUT') {
        riskScore += 20;
        factors.push(`${formData.type} transactions have higher fraud risk`);
      }
      
      // Zero balance risk
      if (oldBalanceOrg === 0 && amount > 0) {
        riskScore += 35;
        factors.push("Transaction from zero balance account");
      }
      
      // Round amounts (common in fraud)
      if (amount % 10000 === 0 && amount > 50000) {
        riskScore += 15;
        factors.push("Round number amount pattern");
      }

      const isFraud = riskScore > 50;
      const confidence = Math.min(95, Math.max(65, riskScore + Math.random() * 20));
      
      setPrediction({
        prediction: isFraud ? 'fraud' : 'legitimate',
        confidence: parseFloat(confidence.toFixed(1)),
        riskScore: Math.min(100, riskScore),
        factors: factors.length > 0 ? factors : ['Normal transaction pattern', 'No significant risk indicators']
      });
      
      setIsLoading(false);
      
      toast({
        title: `Prediction Complete`,
        description: `Transaction classified as ${isFraud ? 'FRAUDULENT' : 'LEGITIMATE'}`,
        variant: isFraud ? "destructive" : "default",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setPrediction(null); // Clear prediction when form changes
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Real-time Fraud Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TRANSFER">TRANSFER</SelectItem>
                <SelectItem value="CASH_OUT">CASH_OUT</SelectItem>
                <SelectItem value="PAYMENT">PAYMENT</SelectItem>
                <SelectItem value="DEBIT">DEBIT</SelectItem>
                <SelectItem value="CASH_IN">CASH_IN</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter transaction amount"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="oldbalanceOrg">Origin Old Balance *</Label>
            <Input
              id="oldbalanceOrg"
              type="number"
              placeholder="Origin account balance before"
              value={formData.oldbalanceOrg}
              onChange={(e) => handleInputChange('oldbalanceOrg', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newbalanceOrig">Origin New Balance *</Label>
            <Input
              id="newbalanceOrig"
              type="number"
              placeholder="Origin account balance after"
              value={formData.newbalanceOrig}
              onChange={(e) => handleInputChange('newbalanceOrig', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="oldbalanceDest">Destination Old Balance</Label>
            <Input
              id="oldbalanceDest"
              type="number"
              placeholder="Destination balance before"
              value={formData.oldbalanceDest}
              onChange={(e) => handleInputChange('oldbalanceDest', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newbalanceDest">Destination New Balance</Label>
            <Input
              id="newbalanceDest"
              type="number"
              placeholder="Destination balance after"
              value={formData.newbalanceDest}
              onChange={(e) => handleInputChange('newbalanceDest', e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          onClick={handlePredict} 
          disabled={isLoading}
          className="w-full"
          variant="gradient"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Analyzing Transaction...
            </>
          ) : (
            'Predict Fraud Risk'
          )}
        </Button>
        
        {prediction && (
          <Card className={`border-2 ${
            prediction.prediction === 'fraud' 
              ? 'border-destructive/30 bg-gradient-to-br from-destructive/10 to-destructive/5' 
              : 'border-success/30 bg-gradient-to-br from-success/10 to-success/5'
          } animate-slide-up`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {prediction.prediction === 'fraud' ? (
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-success" />
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {prediction.prediction === 'fraud' ? 'FRAUD DETECTED' : 'LEGITIMATE TRANSACTION'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Confidence: {prediction.confidence}% | Risk Score: {prediction.riskScore}/100
                  </p>
                </div>
                <Badge 
                  variant={prediction.prediction === 'fraud' ? 'destructive' : 'success'}
                  className="ml-auto"
                >
                  {prediction.prediction.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Analysis Factors:</h4>
                <ul className="space-y-1">
                  {prediction.factors.map((factor, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
              
              {prediction.prediction === 'fraud' && (
                <div className="mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-sm font-medium text-destructive">Recommended Actions:</p>
                  <ul className="text-xs text-destructive/80 mt-1 space-y-1">
                    <li>• Block transaction immediately</li>
                    <li>• Flag account for review</li>
                    <li>• Contact customer for verification</li>
                    <li>• Report to compliance team</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};