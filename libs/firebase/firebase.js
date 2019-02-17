import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.SN_API_KEY,
  authDomain: process.env.SN_AUTH_DOMAIN,
  databaseURL: process.env.SN_DATABASE_URL,
  projectId: process.env.SN_PROJECT_ID,
  storageBucket: process.env.SN_STORAGE_BUCKET,
  messagingSenderId: process.env.SN_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
export const providers = {
  email: firebase.auth.EmailAuthProvider,
  google: new firebase.auth.GoogleAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider()
}

