export interface ClinicData {
  name: string;
  optedIn: boolean;
  patientsShared: number;
  accessCount: number;
  multiplier: number;
}

export interface SharingRequest {
  id: number;
  patientName: string;
  patientCondition: string;
  requestingClinic: string;
  reason: string;
  requestDate: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  conditions: string[];
  lastVisit: string;
}

export type ViewType = 'dashboard' | 'requests' | 'simulator' | 'walkthrough';