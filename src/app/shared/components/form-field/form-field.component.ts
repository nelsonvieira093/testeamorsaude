// src/app/shared/components/form-field/form-field.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {
  // Garante a inicialização do FormControl
  @Input() control: FormControl = new FormControl(''); // Valor padrão vazio
  @Input() label?: string;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' = 'text';
  @Input() placeholder: string = '';
  @Input() helpText?: string;
  @Input() required: boolean = false;
  @Input() options: { value: any, label: string }[] = [];

  fieldId: string = '';

  ngOnInit() {
    this.fieldId = `form-field-${Math.random().toString(36).substr(2, 9)}`;
  }
}