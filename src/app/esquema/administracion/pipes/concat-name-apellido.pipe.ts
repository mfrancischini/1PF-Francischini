import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatNameApellido'
})
export class ConcatNameApellidoPipe implements PipeTransform {

  transform(nombre: string, apellido: string): string {
    return `${nombre} ${apellido}`;
  }
}
