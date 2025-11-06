"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  signup: (name: string, email: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (email: string) => {
    try {
      const storedUser = localStorage.getItem(`user_${email}`);
      if (storedUser) {
        const foundUser = JSON.parse(storedUser);
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast({ title: "Login Successful", description: `Welcome back, ${foundUser.name}!` });
        return true;
      }
      toast({ variant: "destructive", title: "Login Failed", description: "No account found with that email." });
      return false;
    } catch (error) {
      console.error("Failed to login", error);
      toast({ variant: "destructive", title: "Login Failed", description: "An unexpected error occurred." });
      return false;
    }
  };

  const signup = (name: string, email: string) => {
     try {
      const storedUser = localStorage.getItem(`user_${email}`);
      if (storedUser) {
        toast({ variant: "destructive", title: "Signup Failed", description: "An account with this email already exists." });
        return false;
      }
      const newUser: User = { id: `user_${Date.now()}`, name, email };
      localStorage.setItem(`user_${email}`, JSON.stringify(newUser)); // Store by email for lookup
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser)); // Store current user session
      toast({ title: "Signup Successful", description: `Welcome, ${name}!` });
      return true;
    } catch (error) {
       console.error("Failed to signup", error);
       toast({ variant: "destructive", title: "Signup Failed", description: "An unexpected error occurred." });
       return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
