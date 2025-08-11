// src/app/models/clinic.model.ts
// src/app/models/clinic.model.ts

// Defina ou importe o tipo Specialty abaixo conforme necessário
export type Specialty = string;

// Defina ou importe o tipo Region abaixo conforme necessário
export type Region = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul'| 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

export interface Clinic {
  id?: string;
  corporateName: string;
  fantasyName: string;       // Pode ser mapeado como 'name'
  name?: string;             // Adicione esta propriedade opcional
  cnpj: string;
  region: Region | string;
  inaugurationDate: Date | string; // Pode ser mapeado como 'openingDate'
  openingDate?: Date | string;     // Adicione esta propriedade alternativa
  active: boolean;
  medicalSpecialties: (Specialty | string)[]; // Alterado para aceitar objetos// Pode ser mapeado como 'specialties'
  specialties?: Specialty[];       // Adicione esta propriedade alternativa
  address: string;
  city: string;
  state: string;
}