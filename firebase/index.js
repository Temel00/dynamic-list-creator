import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_VSzbUY9Gu5IENdu2xclLdnCz_YB1Kw8',
  authDomain: 'habit-sherpa.firebaseapp.com',
  projectId: 'habit-sherpa',
  storageBucket: 'habit-sherpa.appspot.com',
  messagingSenderId: '957769508304',
  appId: '1:957769508304:web:9b7468509e290dc49c45d5',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
