export class Movie {
    // Konstruktor
    constructor(id, user_id, title, year, imdb, descript, url, user = null)
    {
        this.ID = id;
        this.User_ID = user_id;
        this.Title = title;
        this.Year = year;
        this.IMDB = imdb;
        this.Descript = descript;
        this.Url = url;

        this.User = user;
    }

    // Tulajdonságok
    ID = 0;
    User_ID = 0;
    Title = "";
    Year = 0;
    IMDB = 0;
    Descript = "";
    Url = "";

    // Object
    User: any;
}
