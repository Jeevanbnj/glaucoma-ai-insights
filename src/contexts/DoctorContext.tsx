import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, Doctor } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

type DoctorContextType = {
  doctor: Doctor | null;
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
};

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        await fetchDoctor(session.user.id);
      }
      setIsLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchDoctor(session.user.id);
      } else {
        setDoctor(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchDoctor = async (userId: string) => {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching doctor:", error);
    } else {
      setDoctor(data);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setDoctor(null);
    setUser(null);
    navigate("/auth");
  };

  return (
    <DoctorContext.Provider value={{ doctor, user, isLoading, logout }}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctor() {
  const context = useContext(DoctorContext);
  if (context === undefined) {
    throw new Error("useDoctor must be used within a DoctorProvider");
  }
  return context;
}
