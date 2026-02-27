import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-forms',
  imports: [FormsModule],
  templateUrl: './template-forms.html',
  styleUrl: './template-forms.scss'
})
export class TemplateForms {

  userObj ={
    id: 0,
    name: '',
    username: '',
    email: '',
    password: '',
    city: '',
    state:''
  }

}
