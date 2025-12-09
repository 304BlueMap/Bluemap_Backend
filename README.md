# BlueMap Guardians Platform - Backend API

## Project Overview
This is the dedicated **Node.js + Express Backend** for the BlueMap Guardians Platform. It serves as the core logic layer, connecting the PWA frontend with **Firebase Firestore** and external AI services.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Firebase Firestore (via `firebase-admin` SDK)
- **Language:** TypeScript
- **Deployment:** Firebase App Hosting

## Implemented Modules (aligned with Proposal)

### 1. Interactive Map Module
- **Endpoints:** `/api/map/points`
- **Function:** Fetches ecological hotspots and user-completed cleanup locations to verify real-world outcomes.

### 2. Mission Engine Module
- **Endpoints:** `/api/missions/submit`
- **Function:** Handles mission submissions with **Geofencing logic** (validates coordinates within Penang).

### 3. AI Recognition Module
- **Endpoints:** `/api/ai/identify`
- **Function:** Simulates AI identification of marine species and retrieves English knowledge cards.

### 4. AI vs Plastic Module (Novelty)
- **Endpoints:** `/api/ai/plastic/log`
- **Function:** Specifically logs identified plastic types into a `pollution_tracker` collection for research data.

### 5. Gamification Module
- **Endpoints:** `/api/game/check-rewards`
- **Function:** Auto-calculates points and awards badges (e.g., "Ocean Guardian") based on user achievements.

### 6. Learning Hub Module
- **Endpoints:** `/api/learn/quizzes`
- **Function:** Serves educational content with verified source citations (e.g., WWF, USM).

### 7. Analytics Dashboard Module
- **Endpoints:** `/api/analytics/summary`
- **Function:** Performs server-side aggregation to calculate total trash weight and user participation stats.

### 8. Admin Panel Module
- **Endpoints:** `/api/admin/users`
- **Security:** Protected by **RBAC (Role-Based Access Control)** middleware. Only admins can access.