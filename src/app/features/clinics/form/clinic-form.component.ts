import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClinicService } from '../../../core/services/clinic.service';
import { Clinic } from '../../../models/clinic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { cnpjValidator } from '../../../shared/validators/cnpj.validator';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';

export interface Specialty {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
}

@Component({
  selector: 'app-clinic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css'],
})
export class ClinicFormComponent implements OnInit {
  private clinicService = inject(ClinicService);

  clinicForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  regions: Region[] = [];
  specialties: Specialty[] = [];
  clinicId: string | null = null;
  currentClinic?: Clinic;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clinicForm = this.fb.group({
      corporateName: ['', Validators.required],
      fantasyName: ['', Validators.required],
      cnpj: ['', [Validators.required, cnpjValidator()]],
      region: ['', Validators.required],
      inaugurationDate: ['', Validators.required],
      active: [true],
      medicalSpecialties: [[], [Validators.required, Validators.minLength(5)]],
      address: [''],
      city: [''],
      state: [''],
    });
  }

  ngOnInit(): void {
    this.loadRegionsAndSpecialties();

    this.route.paramMap.subscribe((params) => {
      this.clinicId = params.get('id');
      if (this.clinicId && this.clinicId !== 'new') {
        this.isEditMode = true;
        this.loadClinic(this.clinicId);
      }
    });
  }

  loadClinic(id: string): void {
    this.isLoading = true;
    this.clinicService.getClinic(id).subscribe({
      next: (clinic: Clinic) => {
        this.currentClinic = clinic;
        this.clinicForm.patchValue({
          corporateName: clinic.corporateName,
          fantasyName: clinic.fantasyName,
          cnpj: clinic.cnpj,
          region: clinic.region,
          inaugurationDate: new Date(clinic.inaugurationDate).toISOString().split('T')[0],
          active: clinic.active,
          medicalSpecialties: clinic.medicalSpecialties,
          address: clinic.address || '',
          city: clinic.city || '',
          state: clinic.state || '',
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  loadRegionsAndSpecialties(): void {
    this.isLoading = true;
    this.clinicService.getRegions().subscribe((regions: Region[]) => {
      this.regions = regions;
      this.clinicService.getSpecialties().subscribe((specialties: Specialty[]) => {
        this.specialties = specialties;
        this.isLoading = false;
      });
    });
  }

  onSpecialtyChange(event: Event, specialtyId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const specialtiesControl = this.clinicForm.get('medicalSpecialties');
    let specialties = specialtiesControl?.value || [];

    if (isChecked) {
      if (!specialties.includes(specialtyId)) {
        specialties = [...specialties, specialtyId];
      }
    } else {
      specialties = specialties.filter((id: string) => id !== specialtyId);
    }

    specialtiesControl?.setValue(specialties);
    specialtiesControl?.markAsTouched();
  }

  navigateToClinics(): void {
    this.router.navigate(['/clinics']);
  }

  onSubmit(): void {
    if (this.clinicForm.invalid) {
      this.clinicForm.markAllAsTouched();
      return;
    }

    const formValue = this.clinicForm.value;

    const clinicData: Clinic = {
      corporateName: formValue.corporateName,
      fantasyName: formValue.fantasyName,
      cnpj: formValue.cnpj,
      address: formValue.address || '',
      city: formValue.city || '',
      state: formValue.state || '',
      region: formValue.region,
      inaugurationDate: formValue.inaugurationDate,
      active: formValue.active,
      medicalSpecialties: formValue.medicalSpecialties,
    };

    console.log('Dados preparados para envio:', clinicData);

    // Aqui você pode chamar o serviço para criar ou atualizar:
    if (this.isEditMode && this.clinicId) {
      this.clinicService.updateClinic(this.clinicId, clinicData).subscribe(() => {
        this.navigateToClinics();
      });
    } else {
      this.clinicService.createClinic(clinicData).subscribe(() => {
        this.navigateToClinics();
      });
    }
  }
}
