export class User {
    // Konstruktor
    constructor(id, firstName, lastName, email, password)
    {
        this.ID = id;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Password = password;
    }

    // Tulajdonságok
    ID = 0;
    FirstName = "";
    LastName = "";
    Email = "";
    Password = "";
}
