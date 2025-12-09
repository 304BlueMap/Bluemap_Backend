import { notFound } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/data';
import type { Mission } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Award, Recycle, Eye, Calendar } from 'lucide-react';
import { SubmissionUploadForm } from '@/components/common/submission-upload-form';

export default function MissionDetailPage({ params }: { params: { id: string } }) {
  const mission = db.getMission(params.id);

  if (!mission) {
    notFound();
  }

  const typeDetails = mission.type === 'cleanup'
    ? { icon: Recycle, label: 'Cleanup', color: 'bg-blue-100 text-blue-800' }
    : { icon: Eye, label: 'Observation', color: 'bg-green-100 text-green-800' };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
          <Image
            src={mission.imageUrl}
            alt={mission.title}
            data-ai-hint={mission.imageHint}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{mission.title}</h1>
            <Badge variant="secondary" className="mt-2 capitalize">{mission.status}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mission.description}</p>
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Objective</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                            <typeDetails.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-muted-foreground">Type</p>
                            <p className="font-semibold">{typeDetails.label}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                            <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-muted-foreground">Reward</p>
                            <p className="font-semibold">{mission.points} Points</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-muted-foreground">Location</p>
                            <p className="font-semibold">Penang</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

          </div>
          <div className="lg:col-span-1">
            <SubmissionUploadForm missionId={mission.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
