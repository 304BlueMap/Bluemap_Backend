import { config } from 'dotenv';
config();

import '@/ai/flows/classify-uploaded-images.ts';
import '@/ai/flows/verify-ai-submissions.ts';