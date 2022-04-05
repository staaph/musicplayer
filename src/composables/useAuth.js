import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebase/config.js';

const useAuth = () => {
  //login
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  //logout
  const logout = async () => {
    await signOut(auth);
  };

  return { login, logout };
};

export default useAuth;
