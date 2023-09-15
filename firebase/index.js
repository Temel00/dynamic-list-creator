import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDtY5IUFSaAA44kLSSju9EumkcBaYkGK-Q',
  authDomain: 'floracare-f6bd1.firebaseapp.com',
  projectId: 'floracare-f6bd1',
  storageBucket: 'floracare-f6bd1.appspot.com',
  messagingSenderId: '152182436495',
  appId: '1:152182436495:web:617ff062f9dd57971276fa',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
