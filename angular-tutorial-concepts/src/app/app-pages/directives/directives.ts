import { CommonModule } from '@angular/common';
import { ArrayType } from '@angular/compiler';
import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customdir } from '../../custom-directives/customdir';

@Component({
  selector: 'app-directives',
  imports: [CommonModule, FormsModule, Customdir],
  templateUrl: './directives.html',
  styleUrl: './directives.scss',
})
export class Directives {
  // ngIf example
  showTitle: boolean = true;
  data = ['Hyderabad', 'Bangalore', 'Chennai'];
  data1 = ['Dubai', 'Malasiya', 'Singapore'];
  showHeadOnClick: boolean = false;
  showData() {
    this.showHeadOnClick = !this.showHeadOnClick;
  }

  ifElseData: boolean = false;
  showIfElseData() {
    this.ifElseData = !this.ifElseData;
  }

  // ngFor Examples
  numbers = [1, 2, 3, 4, 5];
  tableHeaders = ['sr.no', 'Movies', 'Rates', 'Locations'];
  tableData = [
    ['1', 'Pushpa', '150', 'Hyderabad'],
    ['2', 'RRR', '180', 'Vizag'],
    ['3', 'Jawan', '200', 'Chennai'],
    ['4', 'Pushpa2', '2000', 'India'],
  ];

  names = ['sant', 'san', 'sa', 's'];
  table = ['Mobiles', 'Index', 'Even', 'Odd', 'First', 'Last'];
  mobiles = ['Samsung', 'Apple', 'Oppo', 'Moto', 'Vivo', 'Zen'];

  mobileObject: Record<string, any>[] = [
    { id: '01', name: 'Apple', Price: '1L', RAM: '8GB', memory: '128GB' },
    { id: '02', name: 'Samsung', Price: '80K', RAM: '8GB', memory: '128GB' },
    { id: '03', name: 'Oppo', Price: '50k', RAM: '8GB', memory: '128GB' },
    { id: '04', name: 'Vivo', Price: '30K', RAM: '8GB', memory: '128GB' },
    { id: '05', name: 'Moto', Price: '20K', RAM: '8GB', memory: '128GB' },
  ];

  // Dynamically fetch headers from first object keys
  mobileTableHeader = Object.keys(this.mobileObject[0]);

  num1: number = 10;
  num2: number = 20;
  num3: number = 30;
  num4: number = 40;

  operation: string = '/';
  operation1: string = '';

  // This is Custom Structural ngIf example
  showIf: boolean = true;

  // Control Flow Statements Examples
  isOffercodeAvailable: boolean = false;

  isSuccesDivVisible: WritableSignal<boolean> = signal(false);

  toggleVisible() {
    this.isSuccesDivVisible.set(!this.isSuccesDivVisible());
  }

  studentTotalMarks: number = 0;

  offerList: any[] = [
    "20% off on Phonepay",
    "15% off on Googlepay",
    "10% off on Amazonpay"
  ]

  prouctList: string[] = [
    "Laptops",
    "Tabs",
    "Mobiles",
    "Tv"
  ]

  employeeList=[
    {name: "AAA", city: "HYD", isActive: false},
    {name: "BBB", city: "Mumbai", isActive: false},
    {name: "CCC", city: "Pune", isActive: true},
    {name: "DDD", city: "Goa", isActive: true},
    {name: "EEE", city: "Kashmir", isActive: false},
    {name: "FFF", city: "UP", isActive: false},
    {name: "GGG", city: "Tamilnadu", isActive: false},
    {name: "HHH", city: "Delhi", isActive: false},
    {name: "III", city: "Lucknow", isActive: true},
    {name: "JJJ", city: "MP", isActive: false}
  ]

  // Attribute Directives Example
  ngClassDir: string = "bg-warning";
  isActive:boolean = false;
  productPrice: number = 400;
  productList=[
    {name: "Mobile", city: "HYD", isActive: false},
    {name: "Laptops", city: "KKP", isActive: true},
    {name: "Desktops", city: "KPHB", isActive: false},
  ]


  divBgColor: string = '';

  myCssTheme = {
    color: 'white',
    'background-color': '#996600',
    'font-size': '20px',
    padding: '10px'
  }

}
