import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UserServiceService]
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(private _UserServiceService : UserServiceService) { 
    //console.log(this._UserServiceService.users);
  }

  LoginClick() {
    if (this._UserServiceService.UserLogin(this.email, this.password))
    {
      
    }
    else
    {

    }
  }

}
