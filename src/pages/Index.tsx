import { DashboardHeader } from "@/components/DashboardHeader";
import { ModelComparison } from "@/components/ModelComparison";
import { FraudAnalytics } from "@/components/FraudAnalytics";
import { TransactionPredictor } from "@/components/TransactionPredictor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <DashboardHeader />
        
        <div className="space-y-8">
          <ModelComparison />
          <FraudAnalytics />
          <TransactionPredictor />
        </div>
        
        <footer className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            Fraud Detection System powered by Machine Learning | 
            <span className="text-primary"> XGBoost, Random Forest & Logistic Regression</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
