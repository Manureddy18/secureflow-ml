import { Shield, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  variant: "default" | "warning" | "success" | "destructive";
}

const StatsCard = ({ title, value, change, icon, variant }: StatsCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "warning":
        return "bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20";
      case "success":
        return "bg-gradient-to-br from-success/10 to-success/5 border-success/20";
      case "destructive":
        return "bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20";
      default:
        return "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "warning":
        return "text-warning";
      case "success":
        return "text-success";
      case "destructive":
        return "text-destructive";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={`${getVariantClasses()} border-2 hover:shadow-lg transition-all duration-300 animate-fade-in`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{change}</p>
          </div>
          <div className={`p-3 rounded-xl ${getIconClasses()}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardHeader = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 animate-slide-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Fraud Detection System
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered transaction monitoring and fraud prevention dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Transactions"
          value="847,392"
          change="+12.5% from last month"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="default"
        />
        <StatsCard
          title="Fraud Detected"
          value="1,247"
          change="+3.2% from last month"
          icon={<AlertTriangle className="h-6 w-6" />}
          variant="destructive"
        />
        <StatsCard
          title="Prevention Rate"
          value="99.85%"
          change="+0.15% improvement"
          icon={<Shield className="h-6 w-6" />}
          variant="success"
        />
        <StatsCard
          title="Model Accuracy"
          value="97.3%"
          change="XGBoost performing best"
          icon={<CheckCircle className="h-6 w-6" />}
          variant="warning"
        />
      </div>
    </div>
  );
};