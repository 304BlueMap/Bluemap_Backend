import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfileStats } from '@/components/common/user-profile-stats';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatRelative } from 'date-fns';

export default function ProfilePage() {
  const user = db.getUser('user1');
  const submissions = db.getSubmissionsForUser('user1');

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <Card className="overflow-hidden">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">Guardian since {new Date().getFullYear()}</p>
          </div>
        </CardContent>
      </Card>
      
      <UserProfileStats user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Your collected achievements.</CardDescription>
            </CardHeader>
            <CardContent>
              {user.badges_earned.length > 0 ? (
                <TooltipProvider>
                  <div className="flex flex-wrap gap-4">
                    {user.badges_earned.map((badge) => (
                      <Tooltip key={badge.id}>
                        <TooltipTrigger>
                          <div className="flex flex-col items-center gap-2">
                             <div className="p-3 bg-accent/50 rounded-full border-2 border-accent">
                                <badge.icon className="h-8 w-8 text-accent-foreground" />
                             </div>
                             <span className="text-xs font-medium text-muted-foreground">{badge.name}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{badge.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              ) : (
                <p className="text-sm text-muted-foreground">Complete more missions to earn badges!</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>My Submissions</CardTitle>
              <CardDescription>A log of your contributions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {submissions.map(sub => {
                  const mission = db.getMission(sub.missionId);
                  return (
                    <li key={sub.id} className="group">
                       <Link href={`/submissions/${sub.id}`}>
                        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0 border">
                             <Image src={sub.photoUrl} alt={`Submission for ${mission?.title}`} data-ai-hint={sub.imageHint} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold group-hover:text-primary transition-colors">{mission?.title}</p>
                            <p className="text-sm text-muted-foreground capitalize">Identified: {sub.aiResult.replace('_', ' ')}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            {sub.isVerified 
                               ? <Badge variant="default" className="bg-green-500/80 hover:bg-green-500 text-white"><CheckCircle className="h-3 w-3 mr-1" /> Verified</Badge>
                               : <Badge variant="secondary"><XCircle className="h-3 w-3 mr-1" /> Pending</Badge>
                            }
                             <p className="text-xs text-muted-foreground mt-1">{formatRelative(sub.timestamp, new Date())}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
