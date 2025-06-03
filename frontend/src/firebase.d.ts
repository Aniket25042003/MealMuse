import { Auth, GoogleAuthProvider } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export const auth: Auth;
export const provider: GoogleAuthProvider;
export const db: Firestore; 