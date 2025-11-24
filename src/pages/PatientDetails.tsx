import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockPatients, mockPredictions } from "@/lib/mockData";
import { ArrowLeft, Plus, User, Calendar, Activity } from "lucide-react";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const patient = mockPatients.find(p => p.id === id);
  const patientPredictions = mockPredictions
    .filter(p => p.patientId === id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-8">
          <p className="text-muted-foreground">Patient not found</p>
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
                <CardDescription>{patient.patientCode}</CardDescription>
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
                <p className="text-lg font-semibold">{patient.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Registered</p>
                <p className="text-lg font-semibold">
                  {new Date(patient.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Medical History</p>
              <p className="text-sm">{patient.medicalHistory}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Risk Factors</p>
              <div className="flex flex-wrap gap-2">
                {patient.riskFactors.map((factor, index) => (
                  <Badge key={index} variant="outline">{factor}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictions History */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction History</CardTitle>
            <CardDescription>
              All glaucoma predictions for this patient ({patientPredictions.length} total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {patientPredictions.length === 0 ? (
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
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Top Features</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientPredictions.map((prediction) => (
                    <TableRow key={prediction.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(prediction.createdAt).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStageColor(prediction.predictedStage)}>
                          {prediction.predictedStage}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {(prediction.probability * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {prediction.topFeatures.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground">
                              {feature.name} ({feature.direction})
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-sm">
                        {prediction.doctorNotes || "-"}
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
