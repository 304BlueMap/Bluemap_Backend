# **App Name**: BlueMap Guardians PWA

## Core Features:

- User Profile Management: Allow users to create and manage their profiles, including tracking points, badges, and mission history. User profile info: ID, profile info, current_points, badges_earned (array), total_missions_completed
- Mission Management: Display available missions with location (geopoint), type (e.g., 'cleanup', 'observation'), status, and description.
- Submission Upload: Enable users to upload photos with location data for mission submissions.
- AI-Powered Image Classification: Use a mock Google Vision API to classify uploaded images and determine species/debris type and confidence score.
- Submission Verification: Automatically verify submissions with high AI confidence and store unverified submissions for retraining.
- Gamified Rewards System: Award points and badges to users upon successful mission completion.
- Knowledge Card Integration: Display educational information (scientific name, conservation tips) related to identified species/debris, triggered by verified submission with high AI confidence. This feature will fetch matching knowledge_card data using aiResult from the submission.

## Style Guidelines:

- Primary color: Deep blue (#29ABE2) to reflect the marine environment and conservation efforts.
- Background color: Light blue (#D0E7F5) to create a clean and airy feel.
- Accent color: Bright green (#90EE90) to highlight key actions and rewards.
- Body and headline font: 'Inter' for a modern, neutral, and readable experience.
- Use simple, outlined icons to represent different mission types and rewards.
- Prioritize a clean and intuitive layout with clear calls to action.
- Incorporate subtle animations for feedback and rewards to enhance user engagement.