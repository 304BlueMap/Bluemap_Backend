import { notFound } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Percent, BrainCircuit } from 'lucide-react';
import { KnowledgeCard } from '@/components/common/knowledge-card';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

export default function SubmissionResultPage({ params }: { params: { id: string } }) {
  const submission = db.getSubmission(params.id);

  if (!submission) {
    notFound();
  }

  const mission = db.getMission(submission.missionId);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submission Result</h1>
          <p className="text-muted-foreground">
            Analysis for your submission to "{mission?.title || 'a mission'}" on {format(submission.timestamp, "PPP")}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Your Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                   <Image
                      src={submission.photoUrl}
                      alt="User submission"
                      fill
                      className="object-contain"
                      data-ai-hint={submission.imageHint}
                    />
                </div>
              </CardContent>
            </Card>
            {submission.isVerified && submission.knowledgeCard && (
                <KnowledgeCard card={submission.knowledgeCard} />
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>Our AI has analyzed your submission.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><BrainCircuit className="h-4 w-4"/> AI Result</span>
                    <span className="font-bold capitalize">{submission.aiResult.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Percent className="h-4 w-4"/> Confidence</span>
                    <span className="font-bold">{Math.round(submission.aiConfidenceScore * 100)}%</span>
                  </div>
                  <Progress value={submission.aiConfidenceScore * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                    {submission.isVerified ? (
                        <div className="flex items-center gap-3 rounded-lg border border-green-500/50 bg-green-500/10 p-4">
                            <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-green-700 dark:text-green-400">Verified!</h3>
                                <p className="text-sm text-green-600 dark:text-green-500">Submission approved. Points awarded!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
                            <XCircle className="h-8 w-8 text-amber-500 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-amber-700 dark:text-amber-400">Pending Review</h3>
                                <p className="text-sm text-amber-600 dark:text-amber-500">Confidence is low. A human will review it soon.</p>
                            </div>
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
