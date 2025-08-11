// src/app/core/services/clinic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clinic } from '../../models/clinic.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl = `${environment.apiUrl}/clinics`;
  private useMock = true; // Altere para false para usar backend real

  // Mock de clínicas para testes locais - agora com 30 clínicas
  private mockClinics: Clinic[] = [
    {
      id: '1',
      corporateName: 'Clínica Amor Saúde Ltda',
      fantasyName: 'Amor Saúde Centro',
      cnpj: '12.345.678/0001-99',
      region: 'Centro',
      inaugurationDate: '2020-01-15',
      active: true,
      medicalSpecialties: ['1', '2'],
      address: 'Rua Principal, 123',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '2',
      corporateName: 'Saúde e Bem Estar S/A',
      fantasyName: 'Clínica Bem Estar',
      cnpj: '98.765.432/0001-11',
      region: 'Zona Norte',
      inaugurationDate: '2019-05-20',
      active: true,
      medicalSpecialties: ['3'],
      address: 'Av. Secundária, 456',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '3',
      corporateName: 'Vida Saudável Serviços Médicos Ltda',
      fantasyName: 'Clínica Vida Saudável',
      cnpj: '23.456.789/0001-22',
      region: 'Zona Sul',
      inaugurationDate: '2018-08-10',
      active: true,
      medicalSpecialties: ['1', '4'],
      address: 'Rua das Flores, 789',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '4',
      corporateName: 'Bem Viver Centro Médico S.A.',
      fantasyName: 'Centro Médico Bem Viver',
      cnpj: '34.567.890/0001-33',
      region: 'Zona Leste',
      inaugurationDate: '2021-03-05',
      active: true,
      medicalSpecialties: ['2', '5'],
      address: 'Av. Brasil, 321',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '5',
      corporateName: 'Clínica Saúde Integral Ltda',
      fantasyName: 'Saúde Integral',
      cnpj: '45.678.901/0001-44',
      region: 'Zona Oeste',
      inaugurationDate: '2017-11-25',
      active: false,
      medicalSpecialties: ['6'],
      address: 'Rua das Palmeiras, 987',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '6',
      corporateName: 'Centro Médico Vida Plena S.A.',
      fantasyName: 'Vida Plena',
      cnpj: '56.789.012/0001-55',
      region: 'Centro',
      inaugurationDate: '2016-07-30',
      active: true,
      medicalSpecialties: ['3', '7'],
      address: 'Av. Liberdade, 654',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '7',
      corporateName: 'Clínica Horizonte Saúde Ltda',
      fantasyName: 'Horizonte Saúde',
      cnpj: '67.890.123/0001-66',
      region: 'Zona Norte',
      inaugurationDate: '2022-02-18',
      active: true,
      medicalSpecialties: ['4', '8'],
      address: 'Rua Nova, 111',
      city: 'São Paulo',
      state: 'SP'
    },
    // Adicionando mais clínicas para totalizar 30
    {
      id: '8',
      corporateName: 'Clínica Vida Longa Ltda',
      fantasyName: 'Vida Longa',
      cnpj: '78.901.234/0001-77',
      region: 'Centro',
      inaugurationDate: '2015-12-12',
      active: true,
      medicalSpecialties: ['1', '5'],
      address: 'Rua das Laranjeiras, 10',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '9',
      corporateName: 'Saúde da Família S.A.',
      fantasyName: 'Clínica Família',
      cnpj: '89.012.345/0001-88',
      region: 'Zona Norte',
      inaugurationDate: '2014-06-23',
      active: true,
      medicalSpecialties: ['2', '3'],
      address: 'Av. das Acácias, 222',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '10',
      corporateName: 'Centro Médico Nova Vida Ltda',
      fantasyName: 'Nova Vida',
      cnpj: '90.123.456/0001-90',
      region: 'Zona Sul',
      inaugurationDate: '2013-10-01',
      active: true,
      medicalSpecialties: ['4', '6'],
      address: 'Rua das Oliveiras, 333',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '11',
      corporateName: 'Clínica Bem Viver Ltda',
      fantasyName: 'Bem Viver',
      cnpj: '11.234.567/0001-11',
      region: 'Zona Leste',
      inaugurationDate: '2012-11-11',
      active: true,
      medicalSpecialties: ['7', '8'],
      address: 'Av. dos Girassóis, 444',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '12',
      corporateName: 'Clínica Saúde Viva Ltda',
      fantasyName: 'Saúde Viva',
      cnpj: '22.345.678/0001-22',
      region: 'Zona Oeste',
      inaugurationDate: '2011-01-20',
      active: true,
      medicalSpecialties: ['1', '3', '5'],
      address: 'Rua dos Jacarandás, 555',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '13',
      corporateName: 'Centro Médico Vida Feliz S.A.',
      fantasyName: 'Vida Feliz',
      cnpj: '33.456.789/0001-33',
      region: 'Centro',
      inaugurationDate: '2010-03-15',
      active: true,
      medicalSpecialties: ['2', '4', '6'],
      address: 'Av. dos Manacás, 666',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '14',
      corporateName: 'Clínica Horizonte Bem Estar Ltda',
      fantasyName: 'Horizonte Bem Estar',
      cnpj: '44.567.890/0001-44',
      region: 'Zona Norte',
      inaugurationDate: '2022-08-08',
      active: true,
      medicalSpecialties: ['7', '1'],
      address: 'Rua das Margaridas, 777',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '15',
      corporateName: 'Clínica Vida Nova Ltda',
      fantasyName: 'Vida Nova',
      cnpj: '55.678.901/0001-55',
      region: 'Zona Sul',
      inaugurationDate: '2019-09-19',
      active: true,
      medicalSpecialties: ['2', '5', '8'],
      address: 'Av. dos Ipês, 888',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '16',
      corporateName: 'Saúde e Vida Ltda',
      fantasyName: 'Saúde e Vida',
      cnpj: '66.789.012/0001-66',
      region: 'Zona Leste',
      inaugurationDate: '2018-07-07',
      active: true,
      medicalSpecialties: ['3', '6', '1'],
      address: 'Rua dos Pinheiros, 999',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '17',
      corporateName: 'Centro Médico Saúde Integral S.A.',
      fantasyName: 'Saúde Integral',
      cnpj: '77.890.123/0001-77',
      region: 'Zona Oeste',
      inaugurationDate: '2015-05-05',
      active: true,
      medicalSpecialties: ['4', '7', '2'],
      address: 'Av. das Flores, 111',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '18',
      corporateName: 'Clínica Bem Estar S.A.',
      fantasyName: 'Bem Estar',
      cnpj: '88.901.234/0001-88',
      region: 'Centro',
      inaugurationDate: '2014-04-04',
      active: true,
      medicalSpecialties: ['5', '8', '3'],
      address: 'Rua das Acácias, 222',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '19',
      corporateName: 'Clínica Vida Saudável Ltda',
      fantasyName: 'Vida Saudável',
      cnpj: '99.012.345/0001-99',
      region: 'Zona Norte',
      inaugurationDate: '2013-03-03',
      active: true,
      medicalSpecialties: ['6', '1', '4'],
      address: 'Av. dos Jasmins, 333',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '20',
      corporateName: 'Centro Médico Saúda Bem S.A.',
      fantasyName: 'Saúda Bem',
      cnpj: '10.123.456/0001-10',
      region: 'Zona Sul',
      inaugurationDate: '2012-02-02',
      active: true,
      medicalSpecialties: ['7', '2', '5'],
      address: 'Rua das Orquídeas, 444',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '21',
      corporateName: 'Clínica Saúde Plena Ltda',
      fantasyName: 'Saúde Plena',
      cnpj: '11.234.567/0001-11',
      region: 'Zona Leste',
      inaugurationDate: '2010-01-01',
      active: true,
      medicalSpecialties: ['8', '3', '6'],
      address: 'Av. das Bromélias, 555',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '22',
      corporateName: 'Clínica Nova Vida Ltda',
      fantasyName: 'Nova Vida',
      cnpj: '22.345.678/0001-22',
      region: 'Zona Oeste',
      inaugurationDate: '2021-10-10',
      active: true,
      medicalSpecialties: ['1', '4', '7'],
      address: 'Rua dos Lírios, 666',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '23',
      corporateName: 'Centro Médico Vida Nova S.A.',
      fantasyName: 'Vida Nova',
      cnpj: '33.456.789/0001-33',
      region: 'Centro',
      inaugurationDate: '2017-09-09',
      active: true,
      medicalSpecialties: ['2', '5', '8'],
      address: 'Av. das Palmeiras, 777',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '24',
      corporateName: 'Clínica Bem Estar Vida Ltda',
      fantasyName: 'Bem Estar Vida',
      cnpj: '44.567.890/0001-44',
      region: 'Zona Norte',
      inaugurationDate: '2016-08-08',
      active: true,
      medicalSpecialties: ['3', '6', '1'],
      address: 'Rua das Camélias, 888',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '25',
      corporateName: 'Clínica Saúde Integral S.A.',
      fantasyName: 'Saúde Integral',
      cnpj: '55.678.901/0001-55',
      region: 'Zona Sul',
      inaugurationDate: '2015-07-07',
      active: false,
      medicalSpecialties: ['4', '7', '2'],
      address: 'Av. das Hortênsias, 999',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '26',
      corporateName: 'Centro Médico Vida Plena Ltda',
      fantasyName: 'Vida Plena',
      cnpj: '66.789.012/0001-66',
      region: 'Zona Leste',
      inaugurationDate: '2014-06-06',
      active: true,
      medicalSpecialties: ['5', '8', '3'],
      address: 'Rua das Dálias, 101',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '27',
      corporateName: 'Clínica Horizonte Saúde Ltda',
      fantasyName: 'Horizonte Saúde',
      cnpj: '77.890.123/0001-77',
      region: 'Zona Oeste',
      inaugurationDate: '2013-05-05',
      active: true,
      medicalSpecialties: ['6', '1', '4'],
      address: 'Av. das Flores, 202',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '28',
      corporateName: 'Clínica Vida Nova Ltda',
      fantasyName: 'Vida Nova',
      cnpj: '88.901.234/0001-88',
      region: 'Centro',
      inaugurationDate: '2012-04-04',
      active: true,
      medicalSpecialties: ['7', '2', '5'],
      address: 'Rua das Palmeiras, 303',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '29',
      corporateName: 'Saúde e Bem Estar Ltda',
      fantasyName: 'Bem Estar Saúde',
      cnpj: '99.012.345/0001-99',
      region: 'Zona Norte',
      inaugurationDate: '2011-03-03',
      active: true,
      medicalSpecialties: ['8', '3', '6'],
      address: 'Av. dos Lírios, 404',
      city: 'São Paulo',
      state: 'SP'
    },
    {
      id: '30',
      corporateName: 'Clínica Saúde Plena Ltda',
      fantasyName: 'Saúde Plena',
      cnpj: '10.123.456/0001-10',
      region: 'Zona Sul',
      inaugurationDate: '2010-02-02',
      active: true,
      medicalSpecialties: ['1', '4', '7'],
      address: 'Rua das Acácias, 505',
      city: 'São Paulo',
      state: 'SP'
    }
  ];

  constructor(private http: HttpClient) {}

  /** Método paginado para listar clínicas */
  getClinics(page: number = 1): Observable<any> {
    if (this.useMock) {
      const mockPageSize = 10;
      const start = (page - 1) * mockPageSize;
      const end = start + mockPageSize;
      const pagedData = this.mockClinics.slice(start, end);

      const total = this.mockClinics.length;
      const lastPage = Math.ceil(total / mockPageSize);

      return of({
        data: pagedData,
        current_page: page,
        last_page: lastPage,
        per_page: mockPageSize,
        total: total,
        next_page_url: page < lastPage ? `${this.apiUrl}?page=${page + 1}` : null,
        prev_page_url: page > 1 ? `${this.apiUrl}?page=${page - 1}` : null,
      }).pipe(delay(300)); // simula delay rede
    }
    // Backend real - chama API com paginação
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  /** Buscar uma clínica específica pelo ID */
  getClinic(id: string): Observable<Clinic> {
    if (this.useMock) {
      const clinic = this.mockClinics.find(c => c.id === id);
      return of(clinic || this.mockClinics[0]).pipe(delay(300));
    }
    return this.http.get<Clinic>(`${this.apiUrl}/${id}`).pipe(
      map(response => ({
        ...response,
        name: response['name'] || response['fantasyName'] || '',
        openingDate: response['openingDate'] || response['inaugurationDate'] || '',
        specialties: response['specialties'] || response['medicalSpecialties'] || []
      }))
    );
  }

  /** Criar uma nova clínica (POST) */
  createClinic(clinic: Clinic): Observable<Clinic> {
    if (this.useMock) {
      clinic.id = (this.mockClinics.length + 1).toString();
      this.mockClinics.push(clinic);
      return of(clinic).pipe(delay(300));
    }
    return this.http.post<Clinic>(this.apiUrl, clinic);
  }

  /** Atualizar clínica existente (PUT) */
  updateClinic(id: string, clinic: Clinic): Observable<Clinic> {
    if (this.useMock) {
      const index = this.mockClinics.findIndex(c => c.id === id);
      if (index !== -1) {
        this.mockClinics[index] = { ...clinic, id };
      }
      return of(clinic).pipe(delay(300));
    }
    return this.http.put<Clinic>(`${this.apiUrl}/${id}`, clinic);
  }

  /** Excluir clínica (DELETE) */
  deleteClinic(id: string): Observable<void> {
    if (this.useMock) {
      this.mockClinics = this.mockClinics.filter(c => c.id !== id);
      return of(undefined).pipe(delay(300));
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Buscar regiões disponíveis (GET) */
  getRegions(): Observable<any[]> {
    if (this.useMock) {
      const regions = [
        { id: '1', name: 'Centro' },
        { id: '2', name: 'Zona Norte' },
        { id: '3', name: 'Zona Sul' },
        { id: '4', name: 'Zona Leste' },
        { id: '5', name: 'Zona Oeste' },
        { id: '6', name: 'Centro' },
        { id: '7', name: 'Zona Norte' }
      ];
      return of(regions).pipe(delay(300));
    }
    return this.http.get<any[]>(`${this.apiUrl}/regions`);
  }

  /** Buscar especialidades médicas disponíveis (GET) */
  getSpecialties(): Observable<any[]> {
    if (this.useMock) {
      const specialties = [
        { id: '1', name: 'Cardiologia' },
        { id: '2', name: 'Dermatologia' },
        { id: '3', name: 'Pediatria' },
        { id: '4', name: 'Ginecologia' },
        { id: '5', name: 'Oftalmologia' },
        { id: '6', name: 'Neurologia' },
        { id: '7', name: 'Ortopedia' }
      ];
      return of(specialties).pipe(delay(300));
    }
    return this.http.get<any[]>(`${this.apiUrl}/specialties`);
  }
}
