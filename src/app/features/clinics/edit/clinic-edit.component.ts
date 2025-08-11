// src/app/features/clinics/edit/clinic-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ClinicService } from '../../../core/services/clinic.service';
import { Clinic } from '../../../models/clinic.model';

@Component({
  selector: 'app-clinic-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinic-edit.component.html',
  styleUrls: ['./clinic-edit.component.css']
})
export class ClinicEditComponent implements OnInit {
  clinicId: string | null = null;
  clinicDetails: Clinic | null = null;
  isLoading = false;

  // Declare aqui o array de especialidades disponíveis
  specialties = [
    { id: '1', name: 'Cardiologia' },
    { id: '2', name: 'Dermatologia' },
    { id: '3', name: 'Pediatria' },
    { id: '4', name: 'Ginecologia' },
    { id: '5', name: 'Oftalmologia' },
    { id: '6', name: 'Neurologia' },
    { id: '7', name: 'Ortopedia' }
  ];

  constructor(
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.paramMap.get('id');
    if (!this.clinicId) {
      this.router.navigate(['/clinics']);
      return;
    }
    this.loadClinic(this.clinicId);
  }

  loadClinic(id: string): void {
    this.isLoading = true;
    this.clinicService.getClinic(id).subscribe({
      next: (data) => {
        this.clinicDetails = data;
        this.isLoading = false;
      },
      error: () => {
        alert('Erro ao carregar a clínica.');
        this.router.navigate(['/clinics']);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid || !this.clinicDetails || !this.clinicId) {
      return;
    }
    this.isLoading = true;
    this.clinicService.updateClinic(this.clinicId, this.clinicDetails).subscribe({
      next: () => {
        alert('Clínica atualizada com sucesso!');
        this.isLoading = false;
        this.router.navigate(['/clinics']);
      },
      error: () => {
        alert('Erro ao atualizar a clínica.');
        this.isLoading = false;
      }
    });
  }

  deleteClinic(): void {
    if (!this.clinicId) return;
    if (confirm('Tem certeza que deseja excluir esta clínica?')) {
      this.clinicService.deleteClinic(this.clinicId).subscribe({
        next: () => {
          alert('Clínica excluída com sucesso!');
          this.router.navigate(['/clinics']);
        },
        error: () => {
          alert('Erro ao excluir a clínica.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/clinics']);
  }

  // Método para adicionar/remover especialidades na lista da clínica
  toggleSpecialty(event: Event): void {
    if (!this.clinicDetails) return;
    const input = event.target as HTMLInputElement;
    // Inicializa o array se necessário
    if (!this.clinicDetails.medicalSpecialties) {
      this.clinicDetails.medicalSpecialties = [];
    }

    if (input.checked) {
      if (!this.clinicDetails.medicalSpecialties.includes(input.value)) {
        this.clinicDetails.medicalSpecialties.push(input.value);
      }
    } else {
      this.clinicDetails.medicalSpecialties = this.clinicDetails.medicalSpecialties.filter(s => s !== input.value);
    }
  }
}
