import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage {

  // Szűrő változók
  sortSelect = 1;
  orderTarget;
  userFilter : number;

  // Felhasználó szűrő lista
  userList = this.userService.users;
  // Filmek lista
  list = this.movieService.movies;

  constructor(private authService : AuthenticationService, private movieService : MovieServiceService, private userService : UserServiceService) 
  { 
  }

  ionViewWillEnter() {
    // Lista újratőltés ha volt változás
    this.movieService.movieListLoad();
    this.list = this.movieService.movies;
  }

  logoutClick()
  {
    // Kijelentkezési procedúra
    localStorage.removeItem('currentUser');
    this.authService.logout();
    window.location.reload();
  }

  onSelectChangeTarget() 
  {
    // Sorrendezés event 
    if (this.orderTarget == "year")
    {
      this.list = this.list.sort(this.dynamicSort("Year"));
    }

    if (this.orderTarget == "imdb")
    {
      this.list = this.list.sort(this.dynamicSort("IMDB"));
    }
  }

  onSelectChangeOrder() 
  {
    // Sorrendezés event iránya
    if (this.orderTarget == "year")
    {
      this.list = this.list.sort(this.dynamicSort("Year"));
    }

    if (this.orderTarget == "imdb")
    {
      this.list = this.list.sort(this.dynamicSort("IMDB"));
    }
  }

  // Sorrendezés
  dynamicSort(property) 
  {
    var sortOrder = this.sortSelect;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  // User filter
  onSelectChangeUser()
  {
    // Egszerü array filter
    this.list = this.movieService.movies;
    this.list = this.list.filter(x => x.User_ID == this.userFilter);
  }

  // Film törlés event
  deleteMovieClick(mov)
  {
    for (let i = 0; i < this.list.length; i++)
    {
      if (mov.ID == this.list[i].ID)
      {
        // Kivágom a listából hogy a felületen egyből frissüljön
        this.list.splice(i, 1);
      }
    }
    // Film törlése servicen keresztül
    this.movieService.movieDelete(mov.ID);
  }
}
