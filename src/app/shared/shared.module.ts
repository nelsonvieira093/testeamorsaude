import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './pipes/date.pipe';  // Importando o pipe de data

@NgModule({
  declarations: [
    // Nenhuma declaração necessária para pipes standalone
  ],
  imports: [
    CommonModule,  // Importando o CommonModule para ter diretivas como ngIf, ngFor, etc.
    DatePipe       // Importando o DatePipe standalone
  ],
  exports: [
    DatePipe       // Exportando o DatePipe para poder usá-lo em outros módulos
  ]
})
export class SharedModule { }
