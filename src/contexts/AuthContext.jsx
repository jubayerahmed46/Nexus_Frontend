/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUpWithEmailAndPassword = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const signInWithEmailAndPass = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    setLoading();
    return signOut(auth);
  };
  const authMethods = {
    user,
    loading,
    signUpWithEmailAndPassword,
    signInWithEmailAndPass,
    googleLogin,
    logoutUser,
  };

  useEffect(() => {
    const clearObserver = onAuthStateChanged(auth, (userCredential) => {
      setUser(userCredential);
      setLoading(false);
      console.log(userCredential);
    });

    return () => clearObserver;
  }, []);
  return (
    <AuthContext.Provider value={authMethods}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
