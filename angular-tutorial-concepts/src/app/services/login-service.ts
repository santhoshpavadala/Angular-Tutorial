import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // baseApiurl = 'https://api.freeprojectapi.com/api/UserApp/CreateNewUser'
  baseApiurl = 'https://api.freeprojectapi.com/api/UserApp/login'

  http = inject(HttpClient);

  loginUser(loginData: LoginModel) {
    return this.http.post(this.baseApiurl, loginData);
  }
}
