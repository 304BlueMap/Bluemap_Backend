import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, CheckSquare, Star } from 'lucide-react';
import type { User } from '@/lib/types';

interface UserProfileStatsProps {
  user: User;
}

export function UserProfileStats({ user }: UserProfileStatsProps) {
  const stats = [
    {
      title: 'Current Points',
      value: user.current_points.toLocaleString(),
      icon: Star,
      color: 'text-amber-500',
    },
    {
      title: 'Missions Completed',
      value: user.total_missions_completed,
      icon: CheckSquare,
      color: 'text-green-500',
    },
    {
      title: 'Badges Earned',
      value: user.badges_earned.length,
      icon: Award,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
