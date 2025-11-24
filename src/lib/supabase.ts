import { supabase } from "@/integrations/supabase/client";

export { supabase };

export type Doctor = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  hospital: string | null;
  specialization: string | null;
  experience_years: number | null;
  created_at: string;
};

export type Patient = {
  id: string;
  doctor_id: string;
  patient_code: string;
  name: string;
  age: number;
  gender: string;
  medical_history: string | null;
  risk_factors: string | null;
  created_at: string;
};

export type Prediction = {
  id: string;
  doctor_id: string;
  patient_id: string;
  image_path: string | null;
  feature_vector: any;
  predicted_stage: string;
  probability: number;
  explanation: any;
  doctor_notes: string | null;
  created_at: string;
};
