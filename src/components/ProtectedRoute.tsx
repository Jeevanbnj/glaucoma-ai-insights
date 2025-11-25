import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "@/contexts/DoctorContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { doctor, isLoading } = useDoctor();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !doctor) {
      navigate("/");
    }
  }, [doctor, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return null;
  }

  return <>{children}</>;
}
