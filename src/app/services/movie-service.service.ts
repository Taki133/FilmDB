import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from '../movie';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  movies:Array<Movie> = [];
  lMovies:Array<Movie> = [];

  constructor(private httpClient: HttpClient, private userService : UserServiceService) { 
    this.movieListLoad();
  }

  movieListLoad()
  {
    this.movies = [];
    this.lMovies = [];
    // Static data betöltés
    this.httpClient.get("../assets/data/movies.json").subscribe(data =>{
      for (let key in data) {
        let movie = new Movie(data[key].ID, data[key].User_ID, data[key].Title, data[key].Year, data[key].IMDB, data[key].Descript, data[key].Url);
        for (let i = 0; i < this.userService.users.length; i++)
        {
          if (movie.User_ID == this.userService.users[i].ID)
          {
            movie.User = this.userService.users[i];
          }
        }
        this.movies.push(movie);
      }
    });

    // Localstorage betöltés
    if (localStorage.getItem('movies'))
    {
      let data = JSON.parse(localStorage.getItem('movies'));
      for (let key in data) {
        this.lMovies.push(new Movie(data[key].ID, data[key].User_ID, data[key].Title, data[key].Year, data[key].IMDB, data[key].Descript, data[key].Url));
      }

      for (let i = 0; i < this.lMovies.length; i++)
      {
        for (let j = 0; j < this.userService.users.length; j++)
        {
          if (this.lMovies[i].User_ID == this.userService.users[j].ID)
          {
            this.lMovies[i].User = this.userService.users[j];
          }
        }
      }
    }
    else
    {
      localStorage.setItem('movies', JSON.stringify(this.lMovies));
    }

    // Hozzáadás a fő listához
    Array.prototype.push.apply(this.movies, this.lMovies);
    console.log(this.movies);
  }

  movieAdd(user_ID, title, year, imdb, descript, url)
  {
    let strMovie : Array<Movie> = [];
    let index : number = 0;
    // ID megkeresése
    for (let i = 0; i < this.movies.length; i++)
    {
      if (this.movies[i].ID > index)
      {
        index = this.movies[i].ID;
      }
    }

    index++;

    // Movie példányosítás
    let newMovie = new Movie(index, user_ID, title, year, imdb, descript, url);

    // Mentés a localstorageba
    if (localStorage.getItem('movies'))
    {
      strMovie = JSON.parse(localStorage.getItem('movies'));
    }

    strMovie.push(newMovie);

    localStorage.setItem('movies', JSON.stringify(strMovie));

    // Fő lista újra betöltése
    this.movieListLoad();
  }

  movieDelete(id)
  {
    // Movie törlése
    let list;
    if (localStorage.getItem('movies'))
    {
      list = JSON.parse(localStorage.getItem('movies'));
      for (let i = 0; i < list.length; i++)
      {
        if (list[i].ID == id)
        {
          list.splice(i, 1);
          localStorage.setItem('movies', list);
        }
      }
    }
  }
}
