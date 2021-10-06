import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  // Global service változók
  users:Array<User> = [];
  file:Array<User> = [];

  constructor(private httpClient: HttpClient) { 
    // Localstorage betöltése ha nincs
    if (!localStorage.getItem('users'))
    {
      localStorage.setItem('users', JSON.stringify(this.file));
      // Local fájl betöltése 
      this.httpClient.get("assets/data/users.json").subscribe(data =>{
        for (let key in data) {
          // Objektummá convertálás
          this.file.push(new User(data[key].ID, data[key].FirstName, data[key].LastName, data[key].Email, data[key].Password));
        }
        // Mentés mindent a localstorageba
        localStorage.setItem('users', JSON.stringify(this.file));
      });
    }
    
    // Teljes lista betöltése
    this.userListLoad();
  }

  userListLoad()
  {
    // Full felhasználók lista ürítése a duplikáció elkerülése miatt
    this.users = [];

    // Localstorage betöltés
    let data = JSON.parse(localStorage.getItem('users'));
    for (let key in data) {
      this.users.push(new User(data[key].ID, data[key].FirstName, data[key].LastName, data[key].Email, data[key].Password));
    }
  }

  userLogin(email, password)
  {
    // Bool hogy bejelentkezhet
    let log = false;

    // Lista újratőltése ha volt reg
    this.userListLoad();

    // Felhasználó kikeresése
    for(let i = 0; i < this.users.length; i++)
    {
      if (this.users[i].Email == email)
      {
        if (this.users[i].Password == password)
        {
          // Bejelentkezett felhasználó mentése
          localStorage.setItem('currentUser', JSON.stringify(this.users[i]));
          // Bejelentkeztetem
          log = true;
          return log;
        }
      }
    }

    // Visszatér ha rosz adatokat adott meg
    return log;
  }

  userRegister(firstName, lastName, email, password)
  {
    // Helyi változók
    let usr : Array<User> = [];
    let index : number = 0;
    // Utolsó ID megkeresése
    for (let i = 0; i < this.users.length; i++)
    {
      if (this.users[i].ID > index)
      {
        index = this.users[i].ID;
      }
    }

    // ID növelése, hogy beszúrjam a következőt
    index++;

    // User példányosítás
    let newUser = new User(index, firstName, lastName, email, password);

    // Hozzáadás a fő listához
    this.users.push(newUser);
    
    // Jelenlegi localstorage lista betöltése
    let data = JSON.parse(localStorage.getItem('users'));
    for (let key in data) {
      usr.push(new User(data[key].ID, data[key].FirstName, data[key].LastName, data[key].Email, data[key].Password));
    }

    // Hozzáadás a localstorage listához hogy az egész mentve legyen
    usr.push(newUser);

    // Mentés a localstorageba
    localStorage.setItem('users', JSON.stringify(usr));
  }
}
