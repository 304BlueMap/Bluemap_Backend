import { db } from '@/lib/data';
import { MissionCard } from '@/components/common/mission-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MissionsPage() {
  const missions = db.getMissions();
  const newMissions = missions.filter(m => m.status === 'new');
  const inProgressMissions = missions.filter(m => m.status === 'in-progress');

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Available Missions</h1>
        <p className="text-muted-foreground">Join our community and help protect Penang's marine life.</p>
      </div>
      
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="new">New Missions</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {newMissions.length > 0 ? (
              newMissions.map(mission => (
                <MissionCard key={mission.id} mission={mission} />
              ))
            ) : (
              <p className="text-muted-foreground md:col-span-2 lg:col-span-3">No new missions available. Check back soon!</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="in-progress">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {inProgressMissions.length > 0 ? (
              inProgressMissions.map(mission => (
                <MissionCard key={mission.id} mission={mission} />
              ))
            ) : (
               <p className="text-muted-foreground md:col-span-2 lg:col-span-3">You have no missions in progress.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
