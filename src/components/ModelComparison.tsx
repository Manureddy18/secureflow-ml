import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const models = [
  {
    name: "XGBoost",
    accuracy: 97.3,
    precision: 96.8,
    recall: 94.2,
    f1Score: 95.5,
    rocAuc: 98.1,
    status: "Best",
    variant: "success" as const,
  },
  {
    name: "Random Forest",
    accuracy: 95.7,
    precision: 94.1,
    recall: 92.8,
    f1Score: 93.4,
    rocAuc: 96.7,
    status: "Good",
    variant: "warning" as const,
  },
  {
    name: "Logistic Regression",
    accuracy: 89.2,
    precision: 87.5,
    recall: 85.3,
    f1Score: 86.4,
    rocAuc: 91.8,
    status: "Baseline",
    variant: "secondary" as const,
  },
];

interface MetricBarProps {
  label: string;
  value: number;
  color: string;
}

const MetricBar = ({ label, value, color }: MetricBarProps) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

export const ModelComparison = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
          Model Performance Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <Card 
              key={model.name} 
              className={`border-2 transition-all duration-300 hover:shadow-lg ${
                model.variant === 'success' 
                  ? 'border-success/30 bg-gradient-to-br from-success/5 to-success/10' 
                  : model.variant === 'warning'
                  ? 'border-warning/30 bg-gradient-to-br from-warning/5 to-warning/10'
                  : 'border-border'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <Badge variant={model.variant}>{model.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <MetricBar label="Accuracy" value={model.accuracy} color="primary" />
                <MetricBar label="Precision" value={model.precision} color="success" />
                <MetricBar label="Recall" value={model.recall} color="warning" />
                <MetricBar label="F1-Score" value={model.f1Score} color="secondary" />
                <MetricBar label="ROC-AUC" value={model.rocAuc} color="primary" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">Model Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-success">XGBoost</span> shows superior performance with highest ROC-AUC score and balanced precision-recall.
            </div>
            <div>
              <span className="font-medium text-warning">Random Forest</span> provides good interpretability with competitive performance metrics.
            </div>
            <div>
              <span className="font-medium">Logistic Regression</span> serves as reliable baseline with fastest inference time.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};