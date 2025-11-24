import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockPatients, mockPredictions } from "@/lib/mockData";
import { UserPlus, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Patients() {
  const navigate = useNavigate();

  const getLastPrediction = (patientId: string) => {
    const patientPredictions = mockPredictions
      .filter(p => p.patientId === patientId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return patientPredictions[0];
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient Code</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Last Stage</TableHead>
                  <TableHead>Last Prediction</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPatients.map((patient) => {
                  const lastPrediction = getLastPrediction(patient.id);
                  return (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.patientCode}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>
                        {lastPrediction ? (
                          <Badge className={getStageColor(lastPrediction.predictedStage)}>
                            {lastPrediction.predictedStage}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">No predictions</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lastPrediction ? (
                          <span className="text-sm">
                            {new Date(lastPrediction.createdAt).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
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
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
