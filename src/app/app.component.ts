import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(router : Router, authentication : AuthenticationService) {
    authentication.authenticationState.subscribe(state => {
      if (state)
      {
        router.navigate(['members','movies']);
      }
      else
      {
        router.navigate(['login']);
      }
    });
  }
}
