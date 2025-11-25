import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, User, Calendar, Activity } from "lucide-react";
import { supabase, Patient } from "@/lib/supabase";
import { toast } from "sonner";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // DEBUG: Log the ID we're looking for
  console.log("PatientDetails - Looking for patient ID:", id);

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);

    // Simplified query without doctor_id filter for debugging
    const { data, error: fetchError } = await supabase
      .from("patients")
      .select("*")
      .eq("id", id)
      .single();

    // DEBUG: Log the error if it exists
    if (fetchError) {
      console.error("PatientDetails - Supabase error:", fetchError);
      setError(fetchError.message);
    } else {
      console.log("PatientDetails - Fetched patient:", data);
      setPatient(data);
    }
    
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading patient details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/doctor/patients")}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>Patient Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                {error ? "Error loading patient:" : "Patient not found"}
              </p>
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md font-mono text-sm">
                  {error}
                </div>
              )}
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Patient ID: <code className="bg-muted px-1 py-0.5 rounded">{id}</code></p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Normal":
        return "bg-stage-normal text-white";
      case "Early Glaucoma":
        return "bg-stage-early text-white";
      case "Moderate Glaucoma":
        return "bg-stage-moderate text-white";
      case "Advanced Glaucoma":
        return "bg-stage-advanced text-white";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/doctor/patients")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>
          <Button 
            onClick={() => navigate(`/doctor/patients/${id}/new-prediction`)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Prediction
          </Button>
        </div>

        {/* Patient Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{patient.name}</CardTitle>
                <CardDescription>{patient.patient_code}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Age</p>
                <p className="text-lg font-semibold">{patient.age} years</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Gender</p>
                <p className="text-lg font-semibold capitalize">{patient.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Registered</p>
                <p className="text-lg font-semibold">
                  {new Date(patient.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {patient.medical_history && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Medical History</p>
                <p className="text-sm">{patient.medical_history}</p>
              </div>
            )}

            {patient.risk_factors && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Risk Factors</p>
                <div className="flex flex-wrap gap-2">
                  {patient.risk_factors.split(", ").map((factor, index) => (
                    <Badge key={index} variant="outline">{factor}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Predictions History */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction History</CardTitle>
            <CardDescription>
              All glaucoma predictions for this patient
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No predictions yet</p>
              <Button
                onClick={() => navigate(`/doctor/patients/${id}/new-prediction`)}
                className="mt-4 gap-2"
              >
                <Plus className="h-4 w-4" />
                Create First Prediction
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
