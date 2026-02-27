import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodata'
})
export class NodataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value != undefined && value!=null && value != '') {
      return value;
    } else {
      return "No Data Available";
    }
  }


  // if(value === undefined || value!=null || value != '') {
  //     return "No Data Available";
  //   } else {
  //     return value;
  //   }
  // }



  //   transform(value: any): any {

  //   if (value === null || value === undefined) {
  //     return 'No Data Available';
  //   }

  //   if (typeof value === 'string' && value.trim() === '') {
  //     return 'No Data Available';
  //   }

  //   if (Array.isArray(value) && value.length === 0) {
  //     return 'No Data Available';
  //   }

  //   return value;
  // }
}
