import { Component, inject } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, ROUTES, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Alert } from '../../app-shared/alert/alert';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  // loginObj: LoginModel = new LoginModel();

  // router = inject(Router);
  // loginData = inject(LoginService)

  // isFormSubmitted:boolean=false;

  // onLogin() {
  //   // // Hardcode login
  //   // if(this.loginObj.email == "admin@gmail.com" && this.loginObj.password == "112233") {
  //   //   this.router.navigateByUrl('/home')
  //   // } else {
  //   //   alert('Wrong Credientials')
  //   // }
  //   this.isFormSubmitted = true;
  //   this.loginData.loginUser(this.loginObj).subscribe({
  //     next: (res:any)=> {
  //       debugger;
  //       // setting the token for UserId in local storage
  //       // In Auth gaurd we can get the loacal storage data
  //       localStorage.setItem('loggedUserId', res.data.userId);
  //       localStorage.setItem('loggedRole', "admin");
  //       this.router.navigateByUrl('/home');
  //       this.isFormSubmitted = false;
  //     },
  //     error: ()=> {
  //       alert('Wrong Credientials')
  //     }
  //   })
  // }







  loginObj: LoginModel = new LoginModel();
  private router = inject(Router);
  private loginData = inject(LoginService);
  isFormSubmitted = false;

  onLogin() {
    this.isFormSubmitted = true;
    this.loginData.loginUser(this.loginObj).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);
        // =================================
        // 1. Store User ID
        // =================================
        localStorage.setItem('loggedUserId', res.data.userId);

        // =================================
        // 2. Store Token
        // =================================
        localStorage.setItem('token',res.data.token);

        // =================================
        // 3. Determine User Role
        // =================================
        let role = '';
        if (res.data.emailId === 'sant-admin@gmail.com') {
          role = 'admin';
        }
        else if (res.data.emailId === 'sant@gmail.com') {
          role = 'user';
        }


        // =================================
        // 4. Store Role
        // =================================
        if (role) {
          localStorage.setItem('loggedRole', role);
        }
        console.log('Logged User:', res.data.emailId);
        console.log('Logged Role:', role);

        // =================================
        // 5. Reset Loading
        // =================================
        this.isFormSubmitted = false;

        // -----------------------------
        // Role Based Landing
        // -----------------------------

        if (role === 'admin') {

          this.router.navigateByUrl(
            '/dashboard/admindashboard'
          );

        }
        else if (role === 'user') {

          this.router.navigateByUrl(
            '/ang-interview'
          );

        }
        else {

          alert('Role not found');

        }
      },

      error: (error) => {
        console.error('Login Error:', error);
        this.isFormSubmitted = false;
        alert('Wrong Credentials');
      }
    });
  }
}
