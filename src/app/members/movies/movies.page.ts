import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  asd = false;

  constructor(private authService : AuthenticationService) { }

  ngOnInit() {
    this.asd = this.authService.authenticationState.value;
  }

}
