import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useDoctor } from "@/contexts/DoctorContext";

export default function NewPatient() {
  const navigate = useNavigate();
  const { doctor } = useDoctor();
  const [isLoading, setIsLoading] = useState(false);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [gender, setGender] = useState("");

  const availableRiskFactors = [
    "Family History",
    "Diabetes",
    "High IOP",
    "Age > 60",
    "Hypertension",
    "Eye Trauma",
    "Myopia",
    "African Ancestry",
    "Previous Eye Surgery",
  ];

  const toggleRiskFactor = (factor: string) => {
    setRiskFactors(prev =>
      prev.includes(factor)
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!doctor) {
      toast.error("Please log in to add patients");
      return;
    }

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const patientCode = formData.get("code") as string;
    const age = parseInt(formData.get("age") as string);
    const medicalHistory = formData.get("history") as string;

    const { error } = await supabase.from("patients").insert({
      doctor_id: doctor.id,
      name,
      patient_code: patientCode,
      age,
      gender,
      medical_history: medicalHistory || null,
      risk_factors: riskFactors.join(", ") || null,
    });

    setIsLoading(false);

    if (error) {
      console.error("Error adding patient:", error);
      toast.error("Failed to add patient");
    } else {
      toast.success("Patient added successfully!");
      navigate("/doctor/patients");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/doctor/patients")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Patients
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Add New Patient</CardTitle>
            <CardDescription>Enter patient information to create a new record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Patient Name *</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Patient Code / MRN *</Label>
                  <Input id="code" name="code" placeholder="MRN-2024-XXX" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input id="age" name="age" type="number" min="0" max="120" placeholder="65" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={gender} onValueChange={setGender} required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="history">Medical History</Label>
                <Textarea
                  id="history"
                  name="history"
                  placeholder="Enter relevant medical history..."
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Risk Factors</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableRiskFactors.map((factor) => (
                    <div key={factor} className="flex items-center space-x-2">
                      <Checkbox
                        id={factor}
                        checked={riskFactors.includes(factor)}
                        onCheckedChange={() => toggleRiskFactor(factor)}
                      />
                      <label
                        htmlFor={factor}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {factor}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isLoading || !gender} className="flex-1">
                  {isLoading ? "Adding Patient..." : "Add Patient"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/doctor/patients")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
