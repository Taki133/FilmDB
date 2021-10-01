export class User {
    constructor(_id, _firstName, _lastName, _email, _password)
    {
        this.ID = _id;
        this.FirstName = _firstName;
        this.LastName = _lastName;
        this.Email = _email;
        this.Password = _password;
    }

    ID = 0;
    FirstName = "";
    LastName = "";
    Email = "";
    Password = "";
}
