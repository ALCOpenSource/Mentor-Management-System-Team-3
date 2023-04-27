import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-8RGG93X3HS"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

// sign in with google authentication function
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  // try {
  //   const res = await signInWithPopup(auth, googleProvider);
  //   const user = res.user;
  //   const q = query(collection(db, "users"), where("uid", "==", user.uid));
  //   const docs = await getDocs(q);
  //   if (docs.docs.length === 0) {
  //     await addDoc(collection(db, "users"), {
  //       uid: user.uid,
  //       name: user.displayName,
  //       authProvider: "google",
  //       email: user.email,
  //     });
  //   }
  // } catch (err) {
  //   console.error(err);
  //   alert(err.message);
  // }
};

// Sign in with email and password function
const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

// Registering a new user with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

// Signup with Google authentication function
const signUpWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


//   Send a password reset link to an email address
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };


  
  export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    signUpWithGoogle,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };


