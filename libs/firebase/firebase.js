import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.SN_API_KEY,
  authDomain: process.env.SN_AUTH_DOMAIN,
  databaseURL: process.env.SN_DATABASE_URL,
  projectId: process.env.SN_PROJECT_ID,
  storageBucket: process.env.SN_STORAGE_BUCKET,
  messagingSenderId: process.env.SN_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    try {
      firebase.initializeApp(config);
      this.auth = firebase.auth();
    } catch (err) {
      // we skip the "already exists" message which is
      // not an actual error when we're hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
      }
    }
  }

  appName = () => {
    return firebase.app.name
  }

  createUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
    });
  }

  linkAnonymousUser = (email, password) =>  {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return user.linkWithCredential(credential);
  }

  onAuthStateChanged = (callback) => firebase.auth().onAuthStateChanged(callback);

  reauthenticate = (password) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticate(credential);
  }

  signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

  signInAnonymously = () => firebase.auth().signInAnonymously();

  signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
  }

  // signInWithGoogle = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   return firebase.auth().signInWithRedirect(provider);
  // }

  signInWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
  }

  signOut = () => firebase.auth().signOut();

  signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

  updateEmail = (email) => firebase.auth().currentUser.updateEmail(email);

  updatePassword = (newPassword) => firebase.auth().currentUser.updatePassword(newPassword);

  sendPasswordResetEmail = (email) => firebase.auth().sendPasswordResetEmail(email);

}

export default Firebase;
export { config }