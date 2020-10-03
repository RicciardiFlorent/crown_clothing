import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBrsAKeqc5kZRPdiksPBXcmgRBVv0_sMbQ",
  authDomain: "crown-clothing-c2c62.firebaseapp.com",
  databaseURL: "https://crown-clothing-c2c62.firebaseio.com",
  projectId: "crown-clothing-c2c62",
  storageBucket: "crown-clothing-c2c62.appspot.com",
  messagingSenderId: "557624020747",
  appId: "1:557624020747:web:da39de464bdb730528dc0e",
  measurementId: "G-WLSJDLF8RL"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
