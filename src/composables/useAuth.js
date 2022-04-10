import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import { ref } from 'vue';

const useAuth = () => {
  const errorMsg = ref();
  const isAuthenticated = ref(false);
  //login
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      isAuthenticated.value = true;
      errorMsg.value = ref();
    } catch (error) {
      const errorMessageMap = {
        'auth/invalid-email': 'Invalid email',
        'auth/wrong-password': 'Incorrect password',
        'auth/user-not-found': 'No account with the provided email found',
      };
      errorMsg.value = errorMessageMap[error.code] ?? 'Incorrect credentials';
    }
  };
  //logout
  const logout = async () => {
    await signOut(auth);
    isAuthenticated.value = false;
  };

  return { login, logout, errorMsg, isAuthenticated };
};

export default useAuth;
