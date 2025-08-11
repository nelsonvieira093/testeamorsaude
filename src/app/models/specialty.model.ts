// src/app/models/specialty.model.ts

/**
 * Modelo representando uma Especialidade Médica
 */
export interface Specialty {
  /** ID único da especialidade (UUID ou número) */
  id: string | number;
  
  /** Nome da especialidade (ex: "Cardiologia") */
  name: string;
  
  /** Slug para URLs (ex: "cardiologia") */
  slug?: string;
  
  /** Descrição opcional */
  description?: string;
  
  /** Status de ativação */
  isActive: boolean;
  
  /** Data de criação */
  createdAt?: Date | string;
  
  /** Data de última atualização */
  updatedAt?: Date | string;
}

/**
 * Tipo para criação de novas especialidades (omitindo campos gerados)
 */
export type CreateSpecialty = Omit<Specialty, 'id' | 'slug' | 'createdAt' | 'updatedAt'>;

/**
 * Tipo para atualização de especialidades (todos campos opcionais)
 */
export type UpdateSpecialty = Partial<CreateSpecialty>;

/**
 * Resposta da API ao listar especialidades
 */
export interface SpecialtiesResponse {
  data: Specialty[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Parâmetros para filtro de especialidades
 */
export interface SpecialtyFilter {
  name?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}