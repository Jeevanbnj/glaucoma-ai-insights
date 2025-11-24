import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockPatients, mockPredictions } from "@/lib/mockData";
import { Users, Activity, Calendar, Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const totalPatients = mockPatients.length;
  const totalPredictions = mockPredictions.length;
  const todayCases = mockPredictions.filter(p => 
    new Date(p.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const recentPredictions = [...mockPredictions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

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
      
      <main className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of your patients and predictions</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/doctor/patients/new")} variant="outline" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Patient
            </Button>
            <Button onClick={() => navigate("/doctor/new-prediction")} className="gap-2">
              <Plus className="h-4 w-4" />
              New Prediction
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground mt-1">Active patients under care</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPredictions}</div>
              <p className="text-xs text-muted-foreground mt-1">AI analyses completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Cases</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayCases}</div>
              <p className="text-xs text-muted-foreground mt-1">New analyses today</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Predictions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Predictions</CardTitle>
            <CardDescription>Latest glaucoma stage predictions for your patients</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPredictions.map((prediction) => (
                  <TableRow key={prediction.id}>
                    <TableCell className="font-medium">{prediction.patientName}</TableCell>
                    <TableCell>
                      {new Date(prediction.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStageColor(prediction.predictedStage)}>
                        {prediction.predictedStage}
                      </Badge>
                    </TableCell>
                    <TableCell>{(prediction.probability * 100).toFixed(1)}%</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/doctor/patients/${prediction.patientId}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
