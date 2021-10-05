import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

const TOPKEN_KEY = 'FILMDB';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login()
  {
    localStorage.setItem('TOKEN_KEY', TOPKEN_KEY);
    return this.authenticationState.next(true);
  }

  logout()
  {
    localStorage.removeItem('TOKEN_KEY');
    return this.authenticationState.next(false);
  }

  isAuthenticated()
  {
    return this.authenticationState.value;
  }

  checkToken()
  {
    if (localStorage.getItem('TOKEN_KEY') == TOPKEN_KEY)
    {
      this.authenticationState.next(true);
    }
  }
}
