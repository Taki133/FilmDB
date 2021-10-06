import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from '../movie';
import { UserServiceService } from './user-service.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  // Global service változók
  movies:Array<Movie> = [];
  file:Array<Movie> = [];

  constructor(private httpClient: HttpClient, private userService : UserServiceService) { 
    // Localstorage betöltése ha nincs
    if (!localStorage.getItem('movies'))
    {
      localStorage.setItem('movies', JSON.stringify(this.file));

      // Local fájl betöltése 
      this.httpClient.get("../assets/data/movies.json").subscribe(data =>{
        for (let key in data) {
          // Film objektummá konvertálása
          let movie = new Movie(data[key].ID, data[key].User_ID, data[key].Title, data[key].Year, data[key].IMDB, data[key].Descript, data[key].Url);
          // Film user hozzákeresése
          for (let i = 0; i < this.userService.users.length; i++)
          {
            if (movie.User_ID == this.userService.users[i].ID)
            {
              // Teljes felhasználó objektum hozzáadása
              movie.User = this.userService.users[i];
            }
          }
          this.file.push(movie);
        }
        // Mentés mindent a localstorageba
        localStorage.setItem('movies', JSON.stringify(this.file));
      });
    }
    
    // Teljes lista betöltése
    this.movieListLoad();  
  }

  movieListLoad()
  {
    // Fő lista ürítése a duplikáció miatt
    this.movies = [];
    
    // Localstorage betöltés
    let data = JSON.parse(localStorage.getItem('movies'));
    for (let key in data) {
      this.movies.push(new Movie(
        data[key].ID,
        data[key].User_ID,
        data[key].Title,
        data[key].Year,
        data[key].IMDB,
        data[key].Descript,
        data[key].Url,
        new User(
          data[key].User.ID, 
          data[key].User.FirstName, 
          data[key].User.LastName, 
          data[key].User.Email, 
          data[key].User.Password
        )
      ));
    }
  }

  movieAdd(user_ID, title, year, imdb, descript, url, user)
  {
    // Helyi változók
    let mov : Array<Movie> = [];
    let index : number = 0;
    // Utolsó ID megkeresése
    for (let i = 0; i < this.movies.length; i++)
    {
      if (this.movies[i].ID > index)
      {
        index = this.movies[i].ID;
      }
    }

    // ID növelése, hogy beszúrjam a következőt
    index++;

    // Movie példányosítás
    let newMovie = new Movie(index, user_ID, title, year, imdb, descript, url, user);

    // Jelenlegi localstorage lista betöltése
    let data = JSON.parse(localStorage.getItem('movies'));
    for (let key in data) {
      mov.push(new Movie(
        data[key].ID,
        data[key].User_ID,
        data[key].Title,
        data[key].Year,
        data[key].IMDB,
        data[key].Descript,
        data[key].Url,
        new User(
          data[key].User.ID, 
          data[key].User.FirstName, 
          data[key].User.LastName, 
          data[key].User.Email, 
          data[key].User.Password
        )
      ));
    }

    // Hozzáadás a localstorage listához hogy az egész mentve legyen
    mov.push(newMovie);

    // Mentés a localstorageba
    localStorage.setItem('movies', JSON.stringify(mov));
  }

  movieDelete(id)
  {
    // Lista
    let list;
    if (localStorage.getItem('movies'))
    {
      list = JSON.parse(localStorage.getItem('movies'));
      for (let i = 0; i < list.length; i++)
      {
        if (list[i].ID == id)
        {
          // Movie törlése
          list.splice(i, 1);
          // Convertálás nélküli törlés
          localStorage.setItem('movies', JSON.stringify(list));
        }
      }
    }
  }
}
