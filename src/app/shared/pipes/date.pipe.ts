import { Pipe, PipeTransform } from '@angular/core';

// Este Pipe será usado para formatar datas em um formato padrão.
@Pipe({
  name: 'customDate'
})
export class DatePipe implements PipeTransform {

  // O método transform realiza a transformação dos dados.
  transform(value: string | Date, format: string = 'dd/MM/yyyy'): string {
    if (!value) return '';  // Se não houver valor, retorna uma string vazia

    // Verifica se a entrada é uma string ou um objeto Date, e cria um objeto Date a partir dela.
    const date = new Date(value);

    // Verifica se a data fornecida é válida
    if (isNaN(date.getTime())) {
      return 'Data inválida'; // Se a data for inválida, retorna um aviso.
    }

    // Formatação básica da data usando o formato fornecido
    let formattedDate = format;

    // Substitui os tokens do formato
    formattedDate = formattedDate.replace('dd', this.padZero(date.getDate()));
    formattedDate = formattedDate.replace('MM', this.padZero(date.getMonth() + 1)); // Meses começam em 0
    formattedDate = formattedDate.replace('yyyy', date.getFullYear().toString());

    return formattedDate;
  }

  // Método auxiliar para adicionar o zero à esquerda para os dias ou meses com valor menor que 10
  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
