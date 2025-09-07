import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const fraudByType = [
  { type: 'TRANSFER', fraud: 847, legitimate: 45623, total: 46470 },
  { type: 'CASH_OUT', fraud: 312, legitimate: 38921, total: 39233 },
  { type: 'PAYMENT', fraud: 88, legitimate: 67432, total: 67520 },
  { type: 'DEBIT', fraud: 0, legitimate: 15234, total: 15234 },
  { type: 'CASH_IN', fraud: 0, legitimate: 12890, total: 12890 },
];

const amountDistribution = [
  { range: '0-1K', fraud: 234, legitimate: 45678 },
  { range: '1K-10K', fraud: 456, legitimate: 23456 },
  { range: '10K-100K', fraud: 387, legitimate: 8765 },
  { range: '100K+', fraud: 170, legitimate: 1234 },
];

const dailyTrends = [
  { day: 'Mon', fraud: 45, total: 12340 },
  { day: 'Tue', fraud: 52, total: 13450 },
  { day: 'Wed', fraud: 38, total: 11890 },
  { day: 'Thu', fraud: 61, total: 14230 },
  { day: 'Fri', fraud: 73, total: 15670 },
  { day: 'Sat', fraud: 29, total: 9870 },
  { day: 'Sun', fraud: 31, total: 10240 },
];

const COLORS = ['hsl(var(--destructive))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--primary))'];

export const FraudAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fraud by Transaction Type */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Fraud by Transaction Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fraudByType}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="type" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="fraud" fill="hsl(var(--destructive))" name="Fraudulent" />
              <Bar dataKey="legitimate" fill="hsl(var(--success))" name="Legitimate" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Amount Distribution */}
      <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Fraud by Amount Range</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={amountDistribution}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="range" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="fraud" fill="hsl(var(--destructive))" name="Fraudulent" />
              <Bar dataKey="legitimate" fill="hsl(var(--primary))" name="Legitimate" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Trends */}
      <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Daily Fraud Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyTrends}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="fraud" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--destructive))' }}
                name="Fraud Cases"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Correlation Insights */}
      <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <div className="text-2xl font-bold text-destructive">68.1%</div>
              <div className="text-sm text-muted-foreground">Fraud in TRANSFER</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="text-2xl font-bold text-warning">25.0%</div>
              <div className="text-sm text-muted-foreground">Fraud in CASH_OUT</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">0.15%</div>
              <div className="text-sm text-muted-foreground">Overall Fraud Rate</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="text-2xl font-bold text-success">$2.3M</div>
              <div className="text-sm text-muted-foreground">Avg Fraud Amount</div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• TRANSFER and CASH_OUT transactions show highest fraud risk</p>
            <p>• Large amounts (100K+) have 12.1% fraud rate vs 0.5% for smaller amounts</p>
            <p>• Friday shows peak fraud activity with 73 cases detected</p>
            <p>• Strong correlation between transaction amount and fraud probability</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};