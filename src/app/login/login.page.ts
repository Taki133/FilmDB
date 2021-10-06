import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UserServiceService, AuthenticationService]
})
export class LoginPage {

  // Form control változók
  email: string = "";
  password: string = "";

  constructor(private userServiceService : UserServiceService, private authService : AuthenticationService, public alertCtrl : AlertController) { 
  }

  // Bejelentkezés esemény
  loginClick() {
    // Ellenőrzöm a felhasználói adatokat servicen keresztül
    if (this.userServiceService.userLogin(this.email, this.password))
    {
      // Az auth guardba is beléptetem ha az adatok stimmelnek
      this.authService.login();
      window.location.reload();
    }
    else
    {
      // Sikertelen bejelentkezés
      this.showAlert();
    }
  }

  // Popup visszajelszés a felhasználónak
  async showAlert() {  
    const alert = await this.alertCtrl.create({  
      header: 'Unable to login',  
      subHeader: '',  
      message: 'Invalid email address and password combination!',  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
  }  
}
