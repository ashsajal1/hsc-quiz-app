import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js"; // Import the User type

// Define store state and methods
export const useAuthStore = defineStore("auth", () => {
  const user: Ref<User | null> = ref(null); // Holds authenticated user info
  const isAuthenticated: Ref<boolean> = ref(false); // Tracks authentication status
  const loading: Ref<boolean> = ref(false); // Tracks loading state
  const error: Ref<string | null> = ref(null); // Holds error messages

  // Login user
  async function login(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: import.meta.env.VITE_REDIRECT_URL,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      await fetchUser(); // Fetch user after successful login
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        console.error("Unknown error:", err);
        error.value = "An unknown error occurred";
      }
    } finally {
      loading.value = false;
    }
  }

  // Fetch current user
  async function fetchUser(): Promise<void> {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        throw new Error(error?.message || "User not found");
      }

      user.value = data.user;
      isAuthenticated.value = true;
    } catch (err) {
      console.error("Error fetching user:", err);
      user.value = null;
      isAuthenticated.value = false;
    }
  }

  // Logout user
  async function logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }

      user.value = null;
      isAuthenticated.value = false;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        console.error("Unknown error:", err);
        error.value = "An unknown error occurred";
      }
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
