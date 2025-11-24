-- Create doctors table
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  hospital TEXT,
  specialization TEXT,
  experience_years INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  patient_code TEXT NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  medical_history TEXT,
  risk_factors TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(doctor_id, patient_code)
);

-- Create predictions table
CREATE TABLE public.predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  image_path TEXT,
  feature_vector JSONB,
  predicted_stage TEXT NOT NULL,
  probability DECIMAL(5,4) NOT NULL,
  explanation JSONB,
  doctor_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Doctors RLS policies
CREATE POLICY "Doctors can view their own profile"
  ON public.doctors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can update their own profile"
  ON public.doctors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert their own profile"
  ON public.doctors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Patients RLS policies
CREATE POLICY "Doctors can view their own patients"
  ON public.patients FOR SELECT
  USING (doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can insert their own patients"
  ON public.patients FOR INSERT
  WITH CHECK (doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can update their own patients"
  ON public.patients FOR UPDATE
  USING (doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can delete their own patients"
  ON public.patients FOR DELETE
  USING (doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid()));

-- Predictions RLS policies
CREATE POLICY "Doctors can view their own predictions"
  ON public.predictions FOR SELECT
  USING (doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can insert their own predictions"
  ON public.predictions FOR INSERT
  WITH CHECK (doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can update their own predictions"
  ON public.predictions FOR UPDATE
  USING (doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid()));

-- Create function to auto-create doctor profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_doctor()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.doctors (user_id, name, email, hospital, specialization, experience_years)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'hospital', ''),
    COALESCE(NEW.raw_user_meta_data->>'specialization', ''),
    COALESCE((NEW.raw_user_meta_data->>'experience_years')::INTEGER, 0)
  );
  RETURN NEW;
END;
$$;

-- Trigger to auto-create doctor profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_doctor();