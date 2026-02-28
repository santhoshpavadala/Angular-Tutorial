import { Component, inject } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { FormsModule } from '@angular/forms';
import { Router, ROUTES } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Alert } from '../../app-shared/alert/alert';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginObj: LoginModel = new LoginModel();

  router = inject(Router);
  loginData = inject(LoginService)


  onLogin() {
    // // Hardcode login
    // if(this.loginObj.email == "admin@gmail.com" && this.loginObj.password == "112233") {
    //   this.router.navigateByUrl('/home')
    // } else {
    //   alert('Wrong Credientials')
    // }

    this.loginData.loginUser(this.loginObj).subscribe({
      next: (res:any)=> {
        debugger;
        // setting the token for UserId in local storage
        // In Auth gaurd we can get the loacal storage data
        localStorage.setItem('loggedUserId', res.data.userId);
        this.router.navigateByUrl('/home')
      },
      error: ()=> {
        alert('Wrong Credientials')
      }
    })
  }

}
