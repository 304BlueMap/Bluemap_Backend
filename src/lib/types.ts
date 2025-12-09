export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  current_points: number;
  badges_earned: Badge[];
  total_missions_completed: number;
};

export type Mission = {
  id: string;
  title: string;
  location: { latitude: number; longitude: number };
  type: 'cleanup' | 'observation';
  status: 'new' | 'in-progress' | 'completed';
  description: string;
  points: number;
  imageUrl: string;
  imageHint: string;
};

export type Submission = {
  id: string;
  userId: string;
  missionId: string;
  photoUrl: string;
  imageHint?: string;
  timestamp: Date;
  location: { latitude: number; longitude: number };
  aiResult: string;
  aiConfidenceScore: number;
  isVerified: boolean;
  knowledgeCard?: KnowledgeCard | null;
};

export type Badge = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
};

export type KnowledgeCard = {
  id: string;
  tag: string;
  title: string;
  scientificName: string;
  description: string;
  conservationTips: string;
};
