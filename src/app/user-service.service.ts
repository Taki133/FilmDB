import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  users:Array<User> = [];

  constructor(private httpClient: HttpClient) { 
    this.httpClient.get("assets/data/users.json").subscribe(data =>{
      //console.log(data);
      /*Object.keys(data).forEach(key => {
        this.users.push(new User(data[key], data[key], data[key], data[key], data[key]));
      });*/

      for (let key in data) {
        this.users.push(new User(data[key].ID, data[key].FirstName, data[key].LastName, data[key].Email, data[key].Password));
      }
    })
  }

  UserLogin(_email, _password)
  {
    let log = false;

    this.users.forEach(user => {
      if (user.Email == _email)
      {
        if (user.Password == _password)
        {
          log = true;
          return log;
        }
      }
    });

    return log;
  }
}
