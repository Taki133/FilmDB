import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.page.html',
  styleUrls: ['./addmovie.page.scss'],
})
export class AddmoviePage {

  // Jelenlegi felhasználó
  currentUser : User;
  // Default thumbnail
  img : string = "assets/thumbnail.png";

  // Form control változók
  userName : string = "";
  title : string = "";
  year : number = null;
  imdb : number = null;
  descript : string = "";
  url : string = "";
  
  constructor(private movieService: MovieServiceService, public alertCtrl: AlertController) 
  { 
    // Current user betöltése
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // Read only mező betöltése
    this.userName = this.currentUser.FirstName + " " + this.currentUser.LastName;
  }

  thumbnailUrlChange()
  {
    // Ha url-t adnak meg betöltöm
    this.img = this.url;
  }

  addMovieClick()
  {
    // Megnézzük hogy nem-e üres a form
    let error = "";

    if (this.title == "")
    {
      error += "<br />- Title not allowed to be empty";
    }

    if (this.year == null)
    {
      error += "<br />- Year not allowed to be empty";
    }

    if (this.imdb == null)
    {
      error += "<br />- Imdb rating not allowed to be empty";
    }

    if (this.descript == "")
    {
      error += "<br />- Descript not allowed to be empty";
    }

    if (this.url == "")
    {
      error += "<br />- Thumbnail url not allowed to be empty";
    }

    // Ha van hiba kiíratom
    if (error == "")
    {
      // Film hozzáadása a listához servicen keresztül
      this.movieService.movieAdd(
        this.currentUser.ID,
        this.title,
        this.year,
        this.imdb,
        this.descript,
        this.url,
        this.currentUser
      );

      // Visszajelzés a sikerről
      this.showAlert("Sucessful", "Your movie was added to te list!");

      // Form ürítése
      this.title = null,
      this.year = null,
      this.imdb = null,
      this.descript = null,
      this.url = null;
    }
    else
    {
      // Hiba van
      this.showAlert('Form filling error', error);
    }
  }

  // Popup ablak megjelenítése
  async showAlert(title, msg) {  
    const alert = await this.alertCtrl.create({  
      header: title,  
      subHeader: '',  
      message: msg,  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
  }  
}
