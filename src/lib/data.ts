import { Award, Anchor, Recycle, Shield, Star } from 'lucide-react';
import type { User, Mission, Submission, Badge, KnowledgeCard } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || { imageUrl: '', imageHint: '' };

export const badges: Badge[] = [
  { id: 'badge1', name: 'First Mission', icon: Star, description: 'Completed your first mission.' },
  { id: 'badge2', name: 'Cleanup Champion', icon: Recycle, description: 'Completed 5 cleanup missions.' },
  { id: 'badge3', name: 'Marine Biologist', icon: Anchor, description: 'Identified 10 marine species.' },
  { id: 'badge4', name: 'Eco-Warrior', icon: Shield, description: 'Earned 1000 points.' },
];

export const users: User[] = [
  {
    id: 'user1',
    name: 'Alex',
    avatarUrl: getImage('avatar-1').imageUrl,
    current_points: 750,
    badges_earned: [badges[0], badges[1]],
    total_missions_completed: 8,
  },
];

export const missions: Mission[] = [
  {
    id: 'mission1',
    title: 'Coral Reef Observation',
    location: { latitude: 5.4182, longitude: 100.3327 },
    type: 'observation',
    status: 'new',
    description: 'Document the health of the coral reefs at Pulau Payar Marine Park. Capture images of coral bleaching or vibrant coral colonies.',
    points: 100,
    imageUrl: getImage('mission-1').imageUrl,
    imageHint: getImage('mission-1').imageHint,
  },
  {
    id: 'mission2',
    title: 'Penang National Park Beach Cleanup',
    location: { latitude: 5.4607, longitude: 100.2079 },
    type: 'cleanup',
    status: 'new',
    description: 'Join us to clean up plastic debris from the shores of Monkey Beach. Every piece of plastic removed helps protect marine life.',
    points: 150,
    imageUrl: getImage('mission-2').imageUrl,
    imageHint: getImage('mission-2').imageHint,
  },
  {
    id: 'mission3',
    title: 'Turtle Sighting at Turtle Beach',
    location: { latitude: 5.4612, longitude: 100.1983 },
    type: 'observation',
    status: 'in-progress',
    description: 'Visit the turtle sanctuary at Pantai Kerachut and upload photos of any sea turtles you spot in the area.',
    points: 200,
    imageUrl: getImage('mission-3').imageUrl,
    imageHint: getImage('mission-3').imageHint,
  },
  {
    id: 'mission4',
    title: 'Gurney Drive Debris Report',
    location: { latitude: 5.4385, longitude: 100.3105 },
    type: 'cleanup',
    status: 'completed',
    description: 'Patrol the Gurney Drive promenade and report any large accumulations of plastic waste or other pollutants.',
    points: 80,
    imageUrl: getImage('mission-4').imageUrl,
    imageHint: getImage('mission-4').imageHint,
  },
];

export const knowledgeCards: KnowledgeCard[] = [
  {
    id: 'kc1',
    tag: 'sea_turtle',
    title: 'Green Sea Turtle',
    scientificName: 'Chelonia mydas',
    description: 'The green sea turtle is a large, weighty sea turtle with a wide, smooth carapace, or shell. It inhabits tropical and subtropical coastal waters around the world.',
    conservationTips: 'Reduce plastic use, keep beaches clean, and avoid disturbing nesting sites. Support organizations that protect turtle habitats.',
  },
  {
    id: 'kc2',
    tag: 'plastic_bottle',
    title: 'Plastic Bottle',
    scientificName: 'N/A',
    description: 'Plastic bottles are a common form of plastic pollution. They can take hundreds of years to decompose and can harm marine life who mistake them for food or become entangled in them.',
    conservationTips: 'Use reusable water bottles. Recycle all plastic bottles properly. Participate in local cleanup events to remove them from the environment.',
  },
  {
    id: 'kc3',
    tag: 'clownfish',
    title: 'Clownfish',
    scientificName: 'Amphiprioninae',
    description: 'Clownfish are well-known for their symbiotic relationship with sea anemones. They are immune to the anemone\'s stinging tentacles.',
    conservationTips: 'Protect coral reefs where they live. Avoid purchasing wild-caught clownfish for aquariums; choose captive-bred instead.'
  },
];

let initialSubmissions: Submission[] = [
  {
    id: 'sub1',
    userId: 'user1',
    missionId: 'mission1',
    photoUrl: getImage('submission-1').imageUrl,
    imageHint: getImage('submission-1').imageHint,
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    location: { latitude: 5.4182, longitude: 100.3327 },
    aiResult: 'clownfish',
    aiConfidenceScore: 0.92,
    isVerified: true,
    knowledgeCard: knowledgeCards.find(kc => kc.tag === 'clownfish')
  },
  {
    id: 'sub2',
    userId: 'user1',
    missionId: 'mission2',
    photoUrl: getImage('submission-2').imageUrl,
    imageHint: getImage('submission-2').imageHint,
    timestamp: new Date(Date.now()- 86400000), // 1 day ago
    location: { latitude: 5.4607, longitude: 100.2079 },
    aiResult: 'plastic_bottle',
    aiConfidenceScore: 0.75,
    isVerified: false,
    knowledgeCard: null
  },
];

// This is a mock database. In a real app, you'd use Firestore or another DB.
class MockDB {
  private users: User[] = users;
  private missions: Mission[] = missions;
  private submissions: Submission[] = initialSubmissions;
  private knowledgeCards: KnowledgeCard[] = knowledgeCards;

  // USER
  getUser(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }
  updateUserPoints(id: string, points: number) {
    const user = this.getUser(id);
    if (user) {
      user.current_points += points;
      user.total_missions_completed += 1;
      console.log(`User ${id} points updated to ${user.current_points}`);
    }
  }

  // MISSIONS
  getMissions(): Mission[] {
    return this.missions;
  }
  getMission(id: string): Mission | undefined {
    return this.missions.find(m => m.id === id);
  }

  // SUBMISSIONS
  getSubmissionsForUser(userId: string): Submission[] {
    return this.submissions.filter(s => s.userId === userId).sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
  getSubmission(id: string): Submission | undefined {
    return this.submissions.find(s => s.id === id);
  }
  createSubmission(submission: Omit<Submission, 'id' | 'timestamp'>): Submission {
    const newSubmission: Submission = {
      ...submission,
      id: `sub_${Date.now()}`,
      timestamp: new Date(),
    };
    
    if (newSubmission.isVerified) {
      const mission = this.getMission(newSubmission.missionId);
      if(mission) {
          this.updateUserPoints(newSubmission.userId, mission.points);
      }
      const knowledgeCard = this.knowledgeCards.find(kc => kc.tag.toLowerCase().includes(newSubmission.aiResult.toLowerCase()));
      newSubmission.knowledgeCard = knowledgeCard;
    }
    
    this.submissions.unshift(newSubmission);
    console.log('New submission created:', newSubmission);
    return newSubmission;
  }
}

export const db = new MockDB();
