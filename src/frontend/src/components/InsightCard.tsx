import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  data: Array<{ label: string; count: number }>;
}

export default function InsightCard({ title, data }: InsightCardProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-foreground/40">No data yet</p>
        ) : (
          <div className="space-y-2">
            {data.slice(0, 5).map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/70">{item.label}</span>
                  <span className="font-medium text-foreground">
                    {item.count}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
