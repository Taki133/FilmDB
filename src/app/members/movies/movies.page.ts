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

  sortSelect = 1;
  orderTarget;
  userFilter : number;

  userList = this.userService.users;
  list = this.movieService.movies;

  constructor(private authService : AuthenticationService, private movieService : MovieServiceService, private userService : UserServiceService) 
  { 
  }

  logoutClick()
  {
    localStorage.removeItem('currentUser');
    this.authService.logout();
    window.location.reload();
  }

  onSelectChangeTarget() 
  {
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
    if (this.orderTarget == "year")
    {
      this.list = this.list.sort(this.dynamicSort("Year"));
    }

    if (this.orderTarget == "imdb")
    {
      this.list = this.list.sort(this.dynamicSort("IMDB"));
    }
  }

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

  onSelectChangeUser()
  {
    this.list = this.movieService.movies;
    this.list = this.list.filter(x => x.User_ID == this.userFilter);
  }

  deleteMovieClick(mov)
  {
    for (let i = 0; i < this.list.length; i++)
    {
      if (mov.ID == this.list[i].ID)
      {
        this.list.splice(i, 1);
      }
    }
    this.movieService.movieDelete(mov.ID);
  }
}
