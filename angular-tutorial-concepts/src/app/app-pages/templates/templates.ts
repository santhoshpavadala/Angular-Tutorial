import { Component } from '@angular/core';

@Component({
  selector: 'app-templates',
  imports: [],
  templateUrl: './templates.html',
  styleUrl: './templates.scss'
})
export class Templates {
  email="";
  updateEmail(input:string) {
    console.log(input);
    this.email=input
  }

  tempHtml = `
  app.component.html
  <h2>Template Reference Variable</h2>

<input type="text" #username placeholder="Enter username">

<button (click)="display(username.value)">
  Submit
</button>

<p>Username: {{ userName }}</p>

app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  userName = '';

  display(value: string) {
    this.userName = value;
  }
}

When you enter Santhosh and click Submit, it displays:Username: Santhosh
  `

  tempForm = `
  <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)">

  <input
    type="text"
    name="username"
    ngModel
    required
    placeholder="Enter username"
  >

  <button type="submit">Submit</button>

  <p>Form Valid: {{ myForm.valid }}</p>

</form>

TypeScript:
submitForm(form: any) {
  console.log(form.value);
  console.log(form.valid);
}

Here:
- #myForm creates a reference to the form.
- ngForm gives access to Angular's form directive.
- myForm.valid checks whether the form is valid.
- myForm.value gets the form data.
Note: Import FormsModule to use ngForm and ngModel.
  `

  tempComponent = `
  @Component({
  selector: 'app-child',
  standalone: true,
  template: \`<h3>Child Component</h3>\`
})
export class ChildComponent {

  message = 'Hello from Child Component';

  showMessage() {
    console.log('Child method called');
  }
}


parent.component.html
<app-child #childRef></app-child>

<button (click)="childRef.showMessage()">
  Call Child Method
</button>

<p>{{ childRef.message }}</p>

Here, #childRef references the child component instance.
  `

}
