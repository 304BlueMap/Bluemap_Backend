import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Recycle, Eye, Award } from 'lucide-react';
import type { Mission } from '@/lib/types';

interface MissionCardProps {
  mission: Mission;
}

export function MissionCard({ mission }: MissionCardProps) {
  const typeIcon = mission.type === 'cleanup' 
    ? <Recycle className="h-4 w-4 text-primary" /> 
    : <Eye className="h-4 w-4 text-primary" />;

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={mission.imageUrl}
          alt={mission.title}
          data-ai-hint={mission.imageHint}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{mission.title}</CardTitle>
          <Badge variant="secondary" className="flex-shrink-0 capitalize">
            {typeIcon}
            <span className="ml-1">{mission.type}</span>
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3" />
          <span>Lat: {mission.location.latitude.toFixed(4)}, Lng: {mission.location.longitude.toFixed(4)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{mission.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 p-4">
        <div className="flex items-center gap-1 font-semibold text-primary">
          <Award className="h-5 w-5" />
          <span>{mission.points} Points</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/missions/${mission.id}`}>
            View Mission
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
