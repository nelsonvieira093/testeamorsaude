import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <h2>Exemplo de Tabela com Pessoas</h2>
    <app-table 
      [headers]="['Nome', 'Idade', 'Cidade', 'Profissão']" 
      [data]="data"
      [actions]="true"
    >
      <ng-template let-item>
        <button class="action-btn" (click)="edit(item)">Editar</button>
        <button class="action-btn" (click)="delete(item)">Excluir</button>
      </ng-template>
    </app-table>
  `,
  styles: [`
    .action-btn {
      padding: 0.25rem 0.5rem;
      margin-right: 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      border: none;
      font-size: 0.875rem;
    }
    h2 {
      margin-bottom: 1rem;
      color: #333;
    }
  `]
})


export class TableExampleComponent {
  data = [
    { Nome: 'João Silva', Idade: 30, Cidade: 'São Paulo', Profissão: 'Médico' },
    { Nome: 'Maria Oliveira', Idade: 25, Cidade: 'Rio de Janeiro', Profissão: 'Enfermeira' },
    { Nome: 'Carlos Souza', Idade: 35, Cidade: 'Belo Horizonte', Profissão: 'Administrador' },
    { Nome: 'Ana Costa', Idade: 28, Cidade: 'Porto Alegre', Profissão: 'Dentista' },
    { Nome: 'Pedro Santos', Idade: 40, Cidade: 'Recife', Profissão: 'Psicólogo' }
  ];

  edit(item: any) {
    console.log('Editar:', item);
    // Implemente a lógica de edição aqui
  }

  delete(item: any) {
    console.log('Excluir:', item);
    // Implemente a lógica de exclusão aqui
  }
}