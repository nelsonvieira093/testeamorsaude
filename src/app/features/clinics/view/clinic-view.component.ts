// src/app/features/clinics/view/clinic-view.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClinicService } from '../../../core/services/clinic.service';
import { Clinic } from '../../../models/clinic.model';

@Component({
  selector: 'app-clinic-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-view.component.html',
  styleUrls: ['./clinic-view.component.css']
})
export class ClinicViewComponent implements OnInit {
  clinicId: string | null = null;
  clinicDetails: Clinic | null = null;
  isLoading = false;

  // Injeta via construtor
  constructor(
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.paramMap.get('id');
    if (!this.clinicId) {
      // Se não veio ID, volta para página de listagem
      this.router.navigate(['/clinics']);
      return;
    }
    this.fetchClinicDetails(this.clinicId);
  }

  fetchClinicDetails(id: string): void {
    this.isLoading = true;
    this.clinicService.getClinic(id).subscribe({
      next: (data: Clinic) => {
        this.clinicDetails = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar clínica:', error);
        this.isLoading = false;
        alert('Erro ao carregar clínica.');
        // Voltar para lista caso erro
        this.router.navigate(['/clinics']);
      }
    });
  }

  // Navegar para edição da clínica
  editClinic(): void {
    if (this.clinicId) {
      this.router.navigate(['/clinics', this.clinicId, 'edit']);
    }
  }

  // Voltar para lista de clínicas
  goBack(): void {
    this.router.navigate(['/clinics']);
  }
}
