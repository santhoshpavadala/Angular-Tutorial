import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ɵAcxChangeDetectionStrategy } from '@angular/core';
import { MyUlList } from '../../app-shared/my-ul-list/my-ul-list';

@Component({
  selector: 'app-change-detection',
  imports: [MyUlList],
  templateUrl: './change-detection.html',
  styleUrl: './change-detection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetection implements OnInit{

  name:string = "Santhosh";

  apiResponse:any[] = [];

  cityList:string[]=["Hyd", "Mubai", "Pune", "Nagpur"]

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe({
      next: (res:any)=> {
        this.apiResponse = res;
        // this.cd.detectChanges();

        setTimeout(()=>{
        this.cd.detectChanges();
        },2000)
      }
    })
  }

  nameChange() {
      this.name = "Angular Developer"
  }

}
