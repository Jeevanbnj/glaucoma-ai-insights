import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { mockPatients } from "@/lib/mockData";
import { ArrowLeft, Upload, FileText, Activity, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function NewPrediction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [notes, setNotes] = useState("");

  const patient = mockPatients.find(p => p.id === id);

  // Mock prediction result
  const mockResult = {
    stage: "Early Glaucoma",
    probability: 0.73,
    features: [
      { name: "RNFL Symmetry", direction: "decreased" as "decreased" | "increased" | "normal", importance: 0.38 },
      { name: "RNFL Inferior", direction: "decreased" as "decreased" | "increased" | "normal", importance: 0.29 },
      { name: "Cup-to-Disc Ratio", direction: "increased" as "decreased" | "increased" | "normal", importance: 0.22 },
      { name: "GC-IPL Thickness", direction: "decreased" as "decreased" | "increased" | "normal", importance: 0.11 },
    ],
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast.success("Analysis complete!");
    }, 3000);
  };

  const handleSave = () => {
    toast.success("Prediction saved successfully!");
    navigate(`/doctor/patients/${id}`);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 max-w-4xl space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/doctor/patients/${id}`)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Patient Details
        </Button>

        {/* Patient Info Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">{patient.patientCode}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                <p className="text-sm text-muted-foreground">Gender: {patient.gender}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!showResults ? (
          <Card>
            <CardHeader>
              <CardTitle>New Prediction</CardTitle>
              <CardDescription>Upload OCT image or enter OCT measurements manually</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload OCT Image</TabsTrigger>
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">OCT image files (PNG, JPG, DICOM)</p>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>RNFL Inferior (μm)</Label>
                      <Input type="number" placeholder="120" />
                    </div>
                    <div className="space-y-2">
                      <Label>RNFL Superior (μm)</Label>
                      <Input type="number" placeholder="130" />
                    </div>
                    <div className="space-y-2">
                      <Label>RNFL Nasal (μm)</Label>
                      <Input type="number" placeholder="75" />
                    </div>
                    <div className="space-y-2">
                      <Label>RNFL Temporal (μm)</Label>
                      <Input type="number" placeholder="70" />
                    </div>
                    <div className="space-y-2">
                      <Label>GC-IPL Thickness (μm)</Label>
                      <Input type="number" placeholder="82" />
                    </div>
                    <div className="space-y-2">
                      <Label>Cup-to-Disc Ratio</Label>
                      <Input type="number" step="0.01" placeholder="0.5" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleAnalyze} disabled={isAnalyzing} className="flex-1">
                  {isAnalyzing ? (
                    <>
                      <Activity className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Run Analysis"
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing OCT data...</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} />
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Results Card */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>AI-powered glaucoma stage prediction with explanation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Predicted Stage</Label>
                    <Badge className={`${getStageColor(mockResult.stage)} text-lg px-4 py-2`}>
                      {mockResult.stage}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Confidence</Label>
                    <div className="flex items-center gap-3">
                      <Progress value={mockResult.probability * 100} className="flex-1" />
                      <span className="text-2xl font-bold">{(mockResult.probability * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Top Contributing Features
                  </Label>
                  <div className="space-y-2">
                    {mockResult.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-medium">{feature.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {feature.direction === "normal" ? (
                                "Within normal range"
                              ) : (
                                <>
                                  {feature.direction} <AlertCircle className="inline h-3 w-3 ml-1" />
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Progress value={feature.importance * 100} className="w-24 mb-1" />
                          <p className="text-xs text-muted-foreground">{(feature.importance * 100).toFixed(0)}% importance</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Doctor Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add your clinical notes and recommendations..."
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSave} className="flex-1">
                    Save Prediction
                  </Button>
                  <Button variant="outline" onClick={() => setShowResults(false)}>
                    Run New Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
