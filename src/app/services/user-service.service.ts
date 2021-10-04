import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  users:Array<User> = [];
  lUsers:Array<User> = [];

  constructor(private httpClient: HttpClient) { 
    this.userListLoad();
  }

  userListLoad()
  {
    // Static data betöltés
    this.httpClient.get("assets/data/users.json").subscribe(data =>{
      for (let key in data) {
        this.users.push(new User(data[key].ID, data[key].FirstName, data[key].LastName, data[key].Email, data[key].Password));
      }
    });

    // Localstorage betöltés
    if (localStorage.getItem('users'))
    {
      this.lUsers = JSON.parse(localStorage.getItem('users'));
      console.log(this.lUsers);
    }
    else
    {
      localStorage.setItem('users', JSON.stringify(this.lUsers));
    }

    // Hozzáadás a fő listához
    Array.prototype.push.apply(this.users, this.lUsers);
  }

  userLogin(email, password)
  {
    let log = false;

    this.users.forEach(user => {
      if (user.Email == email)
      {
        if (user.Password == password)
        {
          log = true;
          return log;
        }
      }
    });

    return log;
  }

  userRegister(firstName, lastName, email, password)
  {
    let strUsers : Array<User> = [];
    let index : number = 0;
    // ID megkeresése
    for (let i = 0; i < this.users.length; i++)
    {
      if (this.users[i].ID > index)
      {
        index = this.users[i].ID;
      }
    }

    index++;

    // User példányosítás
    let newUser = new User(index, firstName, lastName, email, password);

    // Mentés a localstorageba
    if (localStorage.getItem('users'))
    {
      strUsers = JSON.parse(localStorage.getItem('users'));
    }

    strUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(strUsers));

    // Fő list újra betöltése
    this.userListLoad();
  }
}
