export class Movie {
    constructor(id, user_id, title, year, imdb, descript, url)
    {
        this.ID = id;
        this.User_ID = user_id;
        this.Title = title;
        this.Year = year;
        this.IMDB = imdb;
        this.Descript = descript;
        this.Url = url;
    }

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
