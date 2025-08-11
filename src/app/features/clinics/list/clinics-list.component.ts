// src/app/features/clinics/list/clinics-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../../core/services/clinic.service';
import { Clinic } from '../../../models/clinic.model';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CnpjPipe } from '../../../shared/pipes/cnpj.pipe';

@Component({
  selector: 'app-clinics-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, CnpjPipe],
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.css']
})
export class ClinicsListComponent implements OnInit {
  clinics: Clinic[] = [];
  filteredClinics: Clinic[] = [];
  isLoading = false;
  searchTerm = '';
  searchSubject = new Subject<string>();

  // Propriedades para paginação
  currentPage = 1;
  lastPage = 1;

  constructor(
    private clinicService: ClinicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClinics(this.currentPage);

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => this.filterClinics(term));
  }

  // Carrega clínicas para uma página específica
  loadClinics(page: number = 1): void {
    this.isLoading = true;
    this.clinicService.getClinics(page).subscribe({
      next: (resp) => {
        // Esperamos que resp seja um objeto paginado com campos como data, current_page, last_page
        this.clinics = resp.data || [];
        this.filteredClinics = [...this.clinics];
        this.currentPage = resp.current_page || 1;
        this.lastPage = resp.last_page || 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clínicas:', err);
        this.isLoading = false;
        alert('Erro ao carregar clínicas.');
      }
    });
  }

  // Recebe o termo da pesquisa e emite para filtro
  onSearch(term: string): void {
    this.searchTerm = term.trim();
    this.searchSubject.next(this.searchTerm);
  }

  // Filtra a lista localmente conforme o termo informado
  filterClinics(term: string): void {
    if (!term) {
      this.filteredClinics = [...this.clinics];
      return;
    }

    const lowerTerm = term.toLowerCase();

    this.filteredClinics = this.clinics.filter(clinic =>
      (clinic.fantasyName?.toLowerCase().includes(lowerTerm) ?? false) ||
      (clinic.corporateName?.toLowerCase().includes(lowerTerm) ?? false) ||
      (clinic.cnpj?.includes(term) ?? false)
    );
  }

  // Navega para página desejada, recarrega clínicas
  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage || page === this.currentPage) {
      return;
    }
    this.loadClinics(page);
  }

  // Navega para detalhes
  viewClinic(id: string): void {
    this.router.navigate(['/clinics', id]);
  }

  // Navega para edição
  editClinic(id: string): void {
    this.router.navigate(['/clinics', id, 'edit']);
  }

  // Navega para cadastro novo
  addClinic(): void {
    this.router.navigate(['/clinics', 'new']);
  }

  // Exclui clínica e atualiza a lista
  deleteClinic(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta clínica?')) {
      this.clinicService.deleteClinic(id).subscribe({
        next: () => {
          // Atualiza lista após exclusão recarregando a página atual
          this.loadClinics(this.currentPage);
        },
        error: () => {
          alert('Erro ao excluir clínica.');
        }
      });
    }
  }
}
