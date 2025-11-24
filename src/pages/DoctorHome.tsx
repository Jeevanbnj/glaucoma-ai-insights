import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDoctor } from "@/lib/mockData";
import { Eye, AlertTriangle, TrendingUp, Activity, Microscope, Shield } from "lucide-react";
import heroEyeAnatomy from "@/assets/hero-eye-anatomy.png";

export default function DoctorHome() {
  const stages = [
    {
      name: "Normal",
      description: "No detectable structural or functional damage. RNFL thickness within normal limits.",
      color: "bg-stage-normal",
    },
    {
      name: "Early Glaucoma",
      description: "Early structural changes visible on OCT. Mild RNFL thinning, typically asymptomatic.",
      color: "bg-stage-early",
    },
    {
      name: "Moderate Glaucoma",
      description: "Significant RNFL and GC-IPL thinning. Visual field defects detectable on perimetry.",
      color: "bg-stage-moderate",
    },
    {
      name: "Advanced Glaucoma",
      description: "Severe optic nerve damage. Extensive RNFL loss and marked visual field defects.",
      color: "bg-stage-advanced",
    },
  ];

  const features = [
    {
      icon: Microscope,
      title: "OCT-Based Analysis",
      description: "Analyzes RNFL and GC-IPL thickness measurements from optical coherence tomography scans.",
    },
    {
      icon: Activity,
      title: "Stage Prediction",
      description: "Classifies glaucoma into four stages: Normal, Early, Moderate, and Advanced with probability scores.",
    },
    {
      icon: TrendingUp,
      title: "Feature Importance",
      description: "Identifies which OCT features contribute most to the prediction using explainable AI techniques.",
    },
    {
      icon: Shield,
      title: "Longitudinal Tracking",
      description: "Stores patient history to track disease progression and treatment response over time.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 text-primary-foreground">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome, {mockDoctor.name}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                AI-assisted OCT analysis for glaucoma staging with explainable insights
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  {mockDoctor.specialization}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  {mockDoctor.hospital}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  {mockDoctor.experienceYears} years experience
                </Badge>
              </div>
            </div>
            <div className="relative z-10">
              <img
                src={heroEyeAnatomy}
                alt="Eye anatomy showing retinal nerve fiber layer and optic disc"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* What is Glaucoma */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">What is Glaucoma?</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                Glaucoma is a progressive optic neuropathy characterized by irreversible damage to the retinal ganglion 
                cells and their axons, leading to characteristic changes in the optic nerve head and retinal nerve fiber 
                layer (RNFL). The disease typically involves thinning of the RNFL and ganglion cell-inner plexiform layer 
                (GC-IPL), which can be detected using optical coherence tomography (OCT) before significant visual field 
                loss occurs. Early detection and treatment are crucial as vision loss from glaucoma is irreversible.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Why Early Detection Matters */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Why Early Detection Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-stage-early mb-3" />
                <CardTitle>Silent Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Glaucoma often progresses without symptoms in early stages. Patients may not notice vision loss 
                  until significant irreversible damage has occurred.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-stage-advanced mb-3" />
                <CardTitle>Irreversible Damage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vision loss from glaucoma cannot be restored. Early detection and treatment can slow or halt 
                  progression, but cannot reverse existing damage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Role of OCT</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  OCT detects structural changes in RNFL and GC-IPL thickness before functional vision loss occurs, 
                  enabling earlier intervention and better outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Glaucoma Stages */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Glaucoma Stages Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className={`h-3 w-full rounded-full ${stage.color} mb-3`} />
                  <CardTitle className="text-lg">{stage.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How This AI System Helps */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">How This AI System Helps</h2>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Our AI-powered system leverages machine learning and explainable AI to assist in glaucoma diagnosis 
                and staging using OCT-derived features:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  The system uses RNFL thickness measurements (inferior, superior, nasal, temporal), GC-IPL thickness, 
                  TSNIT symmetry patterns, and cup-to-disc ratio to generate predictions. Each prediction includes a 
                  probability score and identifies which features most influenced the diagnosis, providing transparency 
                  and supporting clinical decision-making.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
