// src/app/shared/components/table/table.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'] // Adicionado o CSS
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() actions: boolean = false;
}