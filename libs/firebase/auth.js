import { auth, providers } from './firebase';

// Sign Up
export const createUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signInWithEmailAndPassword = (email, password ) => auth.signInWithEmailAndPassword(email, password);

export const signInWithGoogle = () => {
  auth.signInWithPopup(providers.google).then(function (result) {
      const { user, credential: { accessToken } } = result;
  }).catch(function (error) {
      const { errorCode, errorMessage, email, credential } = error;
  });
}

export const signInAnonymously = () => auth.signInAnonymously();

export const signInWithGithub = () => auth.signInWithRedirect(providers.github);

export const signInWithGoogleP = () => auth.signInWithRedirect(providers.google);

export const signInWithTwitter = () => auth.signInWithRedirect(providers.twitter);

// Sign out
export const signOut = () => auth.signOut();

// Password Reset
export const sendPasswordResetEmail = (email) => auth.sendPasswordResetEmail(email);

// Password Change
export const updatePassword = async (password) => {
  if (auth.currentUser) {
    await auth.currentUser.updatePassword(password);
  }
  throw Error("No auth.currentUser!");
};

export const updateEmail = (email) => auth.currentUser.updateEmail(email);

export const reauthenticate = (password) => {
  const user = auth.currentUser;
  const credential = providers.email.credential(user.email, password);
  return user.reauthenticate(credential);
}

export const linkAnonymousUser = (email, password) =>  {
  const user = auth.currentUser;
  const credential = providers.email.credential(email, password);
  return user.linkWithCredential(credential);
}

export const onAuthStateChanged = (callback) => auth.onAuthStateChanged(callback);