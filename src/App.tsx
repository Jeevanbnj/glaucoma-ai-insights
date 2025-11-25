import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DoctorProvider } from "./contexts/DoctorContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
        <DoctorProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/doctor/home" element={<ProtectedRoute><DoctorHome /></ProtectedRoute>} />
            <Route path="/doctor/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/doctor/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
            <Route path="/doctor/patients/new" element={<ProtectedRoute><NewPatient /></ProtectedRoute>} />
            <Route path="/doctor/patients/:id" element={<ProtectedRoute><PatientDetails /></ProtectedRoute>} />
            <Route path="/doctor/new-prediction" element={<ProtectedRoute><SelectPatient /></ProtectedRoute>} />
            <Route path="/doctor/patients/:id/new-prediction" element={<ProtectedRoute><NewPrediction /></ProtectedRoute>} />
            <Route path="/doctor/model-info" element={<ProtectedRoute><ModelInfo /></ProtectedRoute>} />
            <Route path="/doctor/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DoctorProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
