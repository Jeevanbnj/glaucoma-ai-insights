import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import DoctorHome from "./pages/DoctorHome";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import NewPatient from "./pages/NewPatient";
import PatientDetails from "./pages/PatientDetails";
import SelectPatient from "./pages/SelectPatient";
import NewPrediction from "./pages/NewPrediction";
import ModelInfo from "./pages/ModelInfo";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/doctor/home" element={<DoctorHome />} />
          <Route path="/doctor/dashboard" element={<Dashboard />} />
          <Route path="/doctor/patients" element={<Patients />} />
          <Route path="/doctor/patients/new" element={<NewPatient />} />
          <Route path="/doctor/patients/:id" element={<PatientDetails />} />
          <Route path="/doctor/new-prediction" element={<SelectPatient />} />
          <Route path="/doctor/patients/:id/new-prediction" element={<NewPrediction />} />
          <Route path="/doctor/model-info" element={<ModelInfo />} />
          <Route path="/doctor/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
