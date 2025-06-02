import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (email === "admin@example.com" && password === "password123") {
                resolve(true);
              } else {
                reject(new Error("Invalid email or password"));
              }
            }, 1500);
          });

          const userData: User = {
            email,
            name: email === "admin@example.com" ? "Admin User" : "User",
          };

          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      checkAuth: () => {
        const { user } = get();
        set({ isAuthenticated: !!user });
      },
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state?.user) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);
