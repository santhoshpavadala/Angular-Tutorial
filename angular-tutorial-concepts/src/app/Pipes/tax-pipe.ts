import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tax',
})
export class TaxPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value * 0.1;
  }

}
