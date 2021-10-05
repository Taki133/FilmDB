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
    this.users = [];
    this.lUsers = [];
    // Static data betöltés
    this.httpClient.get("assets/data/users.json").subscribe(data =>{
      for (let key in data) {
        this.users.push(new User(data[key].ID, data[key].FirstName, data[key].LastName, data[key].Email, data[key].Password));
      }
    });

    // Localstorage betöltés
    if (localStorage.getItem('users'))
    {
      let data = JSON.parse(localStorage.getItem('users'));
      for (let key in data) {
        this.lUsers.push(new User(data[key].ID, data[key].FirstName, data[key].LastName, data[key].Email, data[key].Password));
      }
    }
    else
    {
      localStorage.setItem('users', JSON.stringify(this.lUsers));
    }

    // Hozzáadás a fő listához
    Array.prototype.push.apply(this.users, this.lUsers);
    //console.log(this.users);
  }

  userLogin(email, password)
  {
    let log = false;

    for(let i = 0; i < this.users.length; i++)
    {
      if (this.users[i].Email == email)
      {
        if (this.users[i].Password == password)
        {
          localStorage.setItem('currentUser', JSON.stringify(this.users[i]));
          log = true;
          return log;
        }
      }
    }

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

    this.users.push(newUser);
    
    // Mentés a localstorageba
    if (localStorage.getItem('users'))
    {
      strUsers = JSON.parse(localStorage.getItem('users'));
    }

    strUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(strUsers));
  }
}
