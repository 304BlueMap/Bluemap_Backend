import * as admin from 'firebase-admin';

// IMPORTANT: Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
// to the path of your Firebase service account key file.
// This is the recommended approach for server environments.

try {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.error("The GOOGLE_APPLICATION_CREDENTIALS environment variable is not set. The application will not function correctly without it.");
    }
}
git add .
git commit -m "1209"
git push

export const firestore = admin.firestore();
export const auth = admin.auth();
