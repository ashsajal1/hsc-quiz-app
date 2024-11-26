import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Models } from 'appwrite';

// Define user type (from Appwrite Models)
type User = Models.User<Models.Preferences> | null;

// Define store state and methods
export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User> = ref(null); // Holds authenticated user info
  const isAuthenticated: Ref<boolean> = ref(false); // Tracks authentication status
  const loading: Ref<boolean> = ref(false); // Tracks loading state
  const error: Ref<string | null> = ref(null); // Holds error messages

  // Login user
  async function login(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      // await loginWithGoogle(); // Your Google login implementation
      await fetchUser(); // Fetch user after successful login
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // Fetch current user
  async function fetchUser(): Promise<void> {
    try {
      const userData = null;
      user.value = userData;
      isAuthenticated.value = true;
    } catch {
      user.value = null;
      isAuthenticated.value = false;
    }
  }

  // Logout user
  async function logout(): Promise<void> {
    try {
      // await account.deleteSession('current');
      user.value = null;
      isAuthenticated.value = false;
    } catch (err: any) {
      error.value = err.message;
    }
  }

  // Automatically fetch user on store initialization
  fetchUser();

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    fetchUser,
  };
});