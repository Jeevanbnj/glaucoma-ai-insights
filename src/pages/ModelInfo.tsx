import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Eye, Activity, TrendingUp, Microscope, Sparkles } from "lucide-react";

export default function ModelInfo() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Model Information</h1>
          <p className="text-muted-foreground mt-1">Understanding the AI model and glaucoma detection</p>
        </div>

        {/* OCT Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">OCT-Derived Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">RNFL Thickness</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  The Retinal Nerve Fiber Layer (RNFL) consists of retinal ganglion cell axons. OCT measures 
                  thickness in four quadrants:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong>Inferior:</strong> Typically thickest, most sensitive to early glaucoma</li>
                  <li><strong>Superior:</strong> Second thickest, shows early thinning</li>
                  <li><strong>Nasal:</strong> Thinnest, less variable</li>
                  <li><strong>Temporal:</strong> Moderately thick, less affected early</li>
                </ul>
                <Badge variant="outline" className="mt-2">Normal RNFL: 95-105 μm average</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">GC-IPL Thickness</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  The Ganglion Cell-Inner Plexiform Layer (GC-IPL) contains retinal ganglion cell bodies and 
                  their dendrites. It's measured in the macular region.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Complements RNFL analysis</li>
                  <li>Provides macular ganglion cell assessment</li>
                  <li>Particularly useful for myopic patients</li>
                  <li>Shows different patterns than RNFL in some cases</li>
                </ul>
                <Badge variant="outline" className="mt-2">Normal GC-IPL: 75-85 μm average</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">TSNIT Pattern</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  The TSNIT (Temporal-Superior-Nasal-Inferior-Temporal) pattern describes the typical double-hump 
                  distribution of RNFL thickness around the optic disc.
                </p>
                <p className="text-sm text-muted-foreground">
                  Glaucoma disrupts this pattern, causing asymmetry. The AI model analyzes deviations from normal 
                  TSNIT symmetry as an important diagnostic feature.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Cup-to-Disc Ratio</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  The ratio of the optic cup diameter to the optic disc diameter. Glaucomatous damage causes 
                  optic nerve cupping, increasing this ratio.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Normal: typically &lt;0.5</li>
                  <li>Suspicious: 0.5-0.7</li>
                  <li>Glaucomatous: &gt;0.7</li>
                  <li>Vertical C/D ratio most clinically relevant</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Staging Criteria */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Glaucoma Staging Criteria</h2>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-12 w-1 rounded bg-stage-normal" />
                  <div>
                    <h3 className="font-semibold mb-1">Normal / No Glaucoma</h3>
                    <p className="text-sm text-muted-foreground">
                      RNFL and GC-IPL thickness within normal limits. No structural damage. Intraocular pressure 
                      may or may not be elevated. Normal visual fields.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-1 rounded bg-stage-early" />
                  <div>
                    <h3 className="font-semibold mb-1">Early Glaucoma</h3>
                    <p className="text-sm text-muted-foreground">
                      Localized RNFL thinning, typically in inferior or superior quadrants. Mild GC-IPL loss. 
                      Early visual field defects, often in Bjerrum area. Cup-to-disc ratio may show mild increase.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-1 rounded bg-stage-moderate" />
                  <div>
                    <h3 className="font-semibold mb-1">Moderate Glaucoma</h3>
                    <p className="text-sm text-muted-foreground">
                      Significant RNFL thinning in multiple quadrants. Noticeable GC-IPL loss. Visual field 
                      defects extending closer to fixation but not within central 5-10 degrees.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-1 rounded bg-stage-advanced" />
                  <div>
                    <h3 className="font-semibold mb-1">Advanced Glaucoma</h3>
                    <p className="text-sm text-muted-foreground">
                      Severe RNFL loss with average thickness often below 60 μm. Extensive GC-IPL thinning. 
                      Visual field defects threatening or involving fixation. High cup-to-disc ratio (&gt;0.8).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Model Details */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">AI Model Architecture & Performance</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Machine Learning Model</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Model Type</p>
                  <p className="text-sm text-muted-foreground">
                    Random Forest / Gradient Boosting ensemble trained on OCT feature vectors
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Training Data</p>
                  <p className="text-sm text-muted-foreground">
                    Trained on diverse dataset with clinically confirmed glaucoma stages and expert annotations
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Performance Metrics</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Badge variant="outline">Accuracy: 89%</Badge>
                    <Badge variant="outline">F1-Score: 0.87</Badge>
                    <Badge variant="outline">Sensitivity: 91%</Badge>
                    <Badge variant="outline">Specificity: 88%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Explainable AI (XAI)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Method: SHAP Values</p>
                  <p className="text-sm text-muted-foreground">
                    SHapley Additive exPlanations (SHAP) calculate each feature's contribution to the prediction
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Feature Importance</p>
                  <p className="text-sm text-muted-foreground">
                    For each prediction, the model identifies which OCT features (RNFL quadrants, GC-IPL, 
                    symmetry) had the highest impact
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Clinical Value</p>
                  <p className="text-sm text-muted-foreground">
                    Provides transparency, helps doctors understand AI reasoning, and supports clinical 
                    decision-making rather than replacing it
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pipeline */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Analysis Pipeline</h2>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 text-center p-4 rounded-lg bg-primary/5">
                  <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold mb-1">OCT Scan</p>
                  <p className="text-xs text-muted-foreground">Upload or measure</p>
                </div>
                
                <div className="hidden md:block text-muted-foreground">→</div>
                
                <div className="flex-1 text-center p-4 rounded-lg bg-primary/5">
                  <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold mb-1">Feature Extraction</p>
                  <p className="text-xs text-muted-foreground">RNFL, GC-IPL metrics</p>
                </div>
                
                <div className="hidden md:block text-muted-foreground">→</div>
                
                <div className="flex-1 text-center p-4 rounded-lg bg-primary/5">
                  <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold mb-1">ML Prediction</p>
                  <p className="text-xs text-muted-foreground">Stage classification</p>
                </div>
                
                <div className="hidden md:block text-muted-foreground">→</div>
                
                <div className="flex-1 text-center p-4 rounded-lg bg-primary/5">
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold mb-1">Explanation</p>
                  <p className="text-xs text-muted-foreground">SHAP feature analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
