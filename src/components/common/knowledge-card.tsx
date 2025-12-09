import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { KnowledgeCard as KnowledgeCardType } from '@/lib/types';
import { Lightbulb, BookOpen } from 'lucide-react';

interface KnowledgeCardProps {
  card: KnowledgeCardType;
}

export function KnowledgeCard({ card }: KnowledgeCardProps) {
  return (
    <Card className="bg-accent/40 border-accent">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-full">
                <BookOpen className="h-6 w-6 text-accent-foreground"/>
            </div>
            <div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription className="italic">{card.scientificName}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/80">{card.description}</p>
        <Separator />
        <div>
          <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Conservation Tips
          </h4>
          <p className="text-sm text-foreground/80">{card.conservationTips}</p>
        </div>
      </CardContent>
    </Card>
  );
}
