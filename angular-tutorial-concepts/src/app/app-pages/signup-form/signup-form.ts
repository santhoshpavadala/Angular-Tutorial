import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss'
})
export class SignupForm {

  formSubmitedData: any[]= [];

  handleSubmit(submitData:any) {
    console.log(submitData.value, 'submitData');
    // this.formSubmitedData = submitData.value;
    // store submitted form data
    this.formSubmitedData.push(submitData.value);
    // optional: reset form
    submitData.reset();
  }

  signup(data:any) {
    console.log(data, 'signup click');
  }

}
