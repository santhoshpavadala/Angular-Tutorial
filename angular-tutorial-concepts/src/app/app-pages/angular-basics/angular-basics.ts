import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-basics',
  imports: [],
  templateUrl: './angular-basics.html',
  styleUrl: './angular-basics.scss'
})
export class AngularBasics {
title="Angular-Basics";
alertFn() { 
  alert("Welcome to Angular Tutorial")
}

// import { Component, OnInit } from '@angular/core';
// import { takeUntil } from 'rxjs/operators';
// import { PrpdFaultanalysisService } from './prpd-faultanalysis.service';  // Adjust this import according to your service file.

// @Component({
//   selector: 'app-your-component',
//   templateUrl: './your-component.component.html',
//   styleUrls: ['./your-component.component.css']
// })
// // export class YourComponent implements OnInit {
// //   displayChannelName: string = 'none';  // Initially hide the div
// //   prpdFaultCalculatedData: any[] = [];  // This will hold the data from the API

// //   constructor(private PrpdFaultanalysis: PrpdFaultanalysisService) {}

// //   ngOnInit(): void {
// //     // Your initialization logic, if any
// //   }

// //   // This method will be called when the 'Add Sensor' button is clicked
// //   async openAddSensorMenu(ids: string[], startDate: string, endDate: string): Promise<void> {
// //     try {
// //       // Fetch data from the API
// //       const prpdFaultAnalysisData = await this.PrpdFaultanalysis.get(ids, startDate, endDate).pipe(takeUntil(this.destroy$)).toPromise();
// //       this.prpdFaultCalculatedData = prpdFaultAnalysisData.pdFaultCalculatedData;  // Assuming the data you need is in pdFaultCalculatedData
      
// //       // Show the div by changing the display style
// //       this.displayChannelName = 'block';  // You can use 'block' to make it visible, 'none' to hide it
// //     } catch (error) {
// //       console.error('Error fetching fault analysis data:', error);
// //     }
// //   }

// //   // Destroy logic for unsubscribing to avoid memory leaks (if needed)
// //   private destroy$ = new Subject<void>();

// //   ngOnDestroy() {
// //     this.destroy$.next();
// //     this.destroy$.complete();
// //   }
// // }

}
