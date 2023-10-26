import {initializeApp} from 'firebase/app';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBsHuqpq2fEy1P7PibZdSqemUtM18XBKLU",
    authDomain: "login-form-f6cb4.firebaseapp.com",
    projectId: "login-form-f6cb4",
    storageBucket: "login-form-f6cb4.appspot.com",
    messagingSenderId: "455488557158",
    appId: "1:455488557158:web:a96504e2f737a3f38cdda7",
    measurementId: "G-9BSC61LY13"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider ();

  googleProvider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
 ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid );

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName,phoneNumber, email} = userAuth;
        const  createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                phoneNumber,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log('error', error.message)
        }
    }

    return userDocRef;
  
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInUserWithEmailAndPassword= async (email, password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };
