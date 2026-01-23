import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserableData {
  // Subject declaration with obsData instance
  public obsData = new Subject<string>();
  public obsData2 = new Subject<any>();
  constructor() { }
  getData() {
    // Initially in service releasing the data throught next
    this.obsData.next('This is the Data, Next Function Released Data In Obserable');
    this.obsData.error('This Obs Data is not received');//Once error is came then it not gotes to complete statement
    this.obsData.complete();
  }

  getData2() {
    this.obsData2.next('This data is for NgOnInIt Example');
    this.obsData2.error('Obs NgOnInIt Data has some error');
    this.obsData2.complete();
  }
}
