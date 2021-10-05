import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';  
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  constructor(private userService : UserServiceService, public alertCtrl: AlertController) { }

  firstName : string = "";
  lastName : string = "";
  email: string = "";
  password: string = "";
  passwordRe : string = "";

  registerClick()
  {
    // Megnézzük hogy nem-e üres a form
    let error = "";

    if (this.firstName == "")
    {
      error += "<br />- First name not allowed to be empty";
    }

    if (this.lastName == "")
    {
      error += "<br />- Last name not allowed to be empty";
    }

    if (this.email == "")
    {
      error += "<br />- Email not allowed to be empty";
    }

    if (this.password == "")
    {
      error += "<br />- Password not allowed to be empty";
    }

    if (this.password != this.passwordRe)
    {
      error += "<br />- Passwords do not match";
    }

    if (error == "")
    {
      // Regisztrálás
      this.userService.userRegister(
        this.firstName,
        this.lastName,
        this.email,
        this.password
      );

      // Visszajelzés a sikerről
      this.showAlert("Sucessful sign up", "Go to te login page and log in!");

      // Form ürítése
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.passwordRe = "";
    }
    else
    {
      // Hiba van
      this.showAlert('Form filling error', error);
    }
  }

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
