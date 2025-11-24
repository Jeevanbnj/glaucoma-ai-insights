// Mock data for demonstration purposes

export interface Doctor {
  id: string;
  name: string;
  email: string;
  hospital: string;
  specialization: string;
  experienceYears: number;
}

export interface Patient {
  id: string;
  doctorId: string;
  patientCode: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  medicalHistory: string;
  riskFactors: string[];
  createdAt: string;
}

export interface Prediction {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  predictedStage: "Normal" | "Early Glaucoma" | "Moderate Glaucoma" | "Advanced Glaucoma";
  probability: number;
  topFeatures: {
    name: string;
    direction: "decreased" | "increased" | "normal";
    importance: number;
  }[];
  doctorNotes?: string;
  createdAt: string;
}

export const mockDoctor: Doctor = {
  id: "doc1",
  name: "Dr. Sarah Mitchell",
  email: "sarah.mitchell@hospital.com",
  hospital: "City General Hospital",
  specialization: "Ophthalmology",
  experienceYears: 12,
};

export const mockPatients: Patient[] = [
  {
    id: "p1",
    doctorId: "doc1",
    patientCode: "MRN-2024-001",
    name: "John Anderson",
    age: 65,
    gender: "Male",
    medicalHistory: "Hypertension, Type 2 Diabetes. Family history of glaucoma.",
    riskFactors: ["Family History", "Diabetes", "High IOP"],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "p2",
    doctorId: "doc1",
    patientCode: "MRN-2024-002",
    name: "Maria Garcia",
    age: 58,
    gender: "Female",
    medicalHistory: "Migraine, previous eye trauma. Regular eye examinations.",
    riskFactors: ["Eye Trauma", "Myopia"],
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "p3",
    doctorId: "doc1",
    patientCode: "MRN-2024-003",
    name: "Robert Chen",
    age: 72,
    gender: "Male",
    medicalHistory: "Cardiovascular disease, controlled hypertension.",
    riskFactors: ["Age > 60", "Hypertension", "African Ancestry"],
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: "p4",
    doctorId: "doc1",
    patientCode: "MRN-2024-004",
    name: "Emily Thompson",
    age: 45,
    gender: "Female",
    medicalHistory: "No significant medical history. Routine screening.",
    riskFactors: ["High Myopia"],
    createdAt: "2024-10-05T11:20:00Z",
  },
  {
    id: "p5",
    doctorId: "doc1",
    patientCode: "MRN-2024-005",
    name: "Michael Brown",
    age: 68,
    gender: "Male",
    medicalHistory: "Previous cataract surgery. Monitored IOP elevation.",
    riskFactors: ["Post-Cataract Surgery", "Elevated IOP", "Age > 60"],
    createdAt: "2024-11-01T16:45:00Z",
  },
];

export const mockPredictions: Prediction[] = [
  {
    id: "pred1",
    doctorId: "doc1",
    patientId: "p1",
    patientName: "John Anderson",
    predictedStage: "Moderate Glaucoma",
    probability: 0.87,
    topFeatures: [
      { name: "RNFL Inferior", direction: "decreased", importance: 0.42 },
      { name: "RNFL Superior", direction: "decreased", importance: 0.31 },
      { name: "GC-IPL Thickness", direction: "decreased", importance: 0.18 },
    ],
    doctorNotes: "Patient shows progressive thinning. Recommend treatment intensification.",
    createdAt: "2024-11-20T10:30:00Z",
  },
  {
    id: "pred2",
    doctorId: "doc1",
    patientId: "p2",
    patientName: "Maria Garcia",
    predictedStage: "Early Glaucoma",
    probability: 0.73,
    topFeatures: [
      { name: "RNFL Symmetry", direction: "decreased", importance: 0.38 },
      { name: "RNFL Inferior", direction: "decreased", importance: 0.29 },
      { name: "Cup-to-Disc Ratio", direction: "increased", importance: 0.22 },
    ],
    doctorNotes: "Early structural changes detected. Monitor closely every 3 months.",
    createdAt: "2024-11-22T14:15:00Z",
  },
  {
    id: "pred3",
    doctorId: "doc1",
    patientId: "p3",
    patientName: "Robert Chen",
    predictedStage: "Advanced Glaucoma",
    probability: 0.94,
    topFeatures: [
      { name: "RNFL Inferior", direction: "decreased", importance: 0.51 },
      { name: "RNFL Superior", direction: "decreased", importance: 0.45 },
      { name: "GC-IPL Thickness", direction: "decreased", importance: 0.38 },
    ],
    doctorNotes: "Significant damage. Patient on maximum medical therapy. Consider surgical intervention.",
    createdAt: "2024-11-23T09:00:00Z",
  },
  {
    id: "pred4",
    doctorId: "doc1",
    patientId: "p4",
    patientName: "Emily Thompson",
    predictedStage: "Normal",
    probability: 0.96,
    topFeatures: [
      { name: "RNFL Thickness", direction: "normal", importance: 0.35 },
      { name: "GC-IPL Thickness", direction: "normal", importance: 0.32 },
      { name: "RNFL Symmetry", direction: "normal", importance: 0.28 },
    ],
    doctorNotes: "No signs of glaucomatous damage. Continue annual screenings.",
    createdAt: "2024-11-24T11:00:00Z",
  },
  {
    id: "pred5",
    doctorId: "doc1",
    patientId: "p1",
    patientName: "John Anderson",
    predictedStage: "Early Glaucoma",
    probability: 0.68,
    topFeatures: [
      { name: "RNFL Inferior", direction: "decreased", importance: 0.35 },
      { name: "RNFL Symmetry", direction: "decreased", importance: 0.27 },
      { name: "GC-IPL Thickness", direction: "decreased", importance: 0.19 },
    ],
    doctorNotes: "Initial detection 6 months ago. Shows progression despite treatment.",
    createdAt: "2024-05-15T08:30:00Z",
  },
];
