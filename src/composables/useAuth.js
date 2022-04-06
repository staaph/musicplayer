import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import { ref } from 'vue';

const errorMsg = ref();
const isAuthenticated = ref(false);

const useAuth = () => {
  errorMsg.value = ref();
  //login
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      isAuthenticated.value = true;
      errorMsg.value = '';
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg.value = 'Invalid email';
          break;
        case 'auth/user-not-found':
          errorMsg.value = 'No account with the provided email found';
          break;
        case 'auth/wrong-password':
          errorMsg.value = 'Incorrect password';
          break;
        default:
          errorMsg.value = 'Incorrect credentials';
          break;
      }
    }
  };
  //logout
  const logout = async () => {
    await signOut(auth);
  };

  return { login, logout, errorMsg, isAuthenticated };
};

export default useAuth;
