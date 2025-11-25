import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase, Patient } from "@/lib/supabase";
import { useDoctor } from "@/contexts/DoctorContext";
import { toast } from "sonner";

export default function Patients() {
  const navigate = useNavigate();
  const { doctor } = useDoctor();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (doctor) {
      fetchPatients();
    }
  }, [doctor]);

  const fetchPatients = async () => {
    if (!doctor) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("doctor_id", doctor.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to load patients");
    } else {
      setPatients(data || []);
    }
    setIsLoading(false);
  };

  const getStageColor = (stage?: string) => {
    if (!stage) return "bg-muted";
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
      
      <main className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patients</h1>
            <p className="text-muted-foreground mt-1">Manage your patient records</p>
          </div>
          <Button onClick={() => navigate("/doctor/patients/new")} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Patients</CardTitle>
            <CardDescription>View and manage patient information</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Loading patients...</p>
              </div>
            ) : patients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No patients added yet</p>
                <Button onClick={() => navigate("/doctor/patients/new")} className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Your First Patient
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Patient Code</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Risk Factors</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.patient_code}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell className="capitalize">{patient.gender}</TableCell>
                      <TableCell>
                        {patient.risk_factors ? (
                          <span className="text-sm">{patient.risk_factors}</span>
                        ) : (
                          <span className="text-muted-foreground text-sm">None listed</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                            className="gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/doctor/patients/${patient.id}/new-prediction`)}
                            className="gap-1"
                          >
                            <Plus className="h-3 w-3" />
                            Predict
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
