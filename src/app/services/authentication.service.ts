import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

// Login token
const TOPKEN_KEY = 'FILMDB';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Változó amit váltunk ha be van jelentkezve
  authenticationState = new BehaviorSubject(false);

  constructor(private plt: Platform) { 
    // Ha platform kész
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login()
  {
    // Localstorageba mentjük az auth adatokat
    localStorage.setItem('TOKEN_KEY', TOPKEN_KEY);
    return this.authenticationState.next(true);
  }

  logout()
  {
    // Localstorageból töröljük a tokent
    localStorage.removeItem('TOKEN_KEY');
    return this.authenticationState.next(false);
  }

  isAuthenticated()
  {
    // Lekérdjük a jelenlegi állapotot
    return this.authenticationState.value;
  }

  checkToken()
  {
    // Checkoljuk hogy bevan-e jelentkezve
    if (localStorage.getItem('TOKEN_KEY') == TOPKEN_KEY)
    {
      this.authenticationState.next(true);
    }
  }
}
