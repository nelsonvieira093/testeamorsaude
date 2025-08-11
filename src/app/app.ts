import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  // Não é necessário importar RouterOutlet aqui
  // imports: [RouterOutlet], 
  templateUrl: './app.html', 
  styleUrls: ['./app.css'] // Alterado para styleUrls
})
export class App {
  protected readonly title = signal('amorsaude-frontend');
}


