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

  email: string = "";
  password: string = "";

  constructor(private userServiceService : UserServiceService, private authService : AuthenticationService, public alertCtrl : AlertController) { 
  }

  loginClick() {
    if (this.userServiceService.userLogin(this.email, this.password))
    {
      this.authService.login();
      window.location.reload();
    }
    else
    {
      this.showAlert();
    }
  }

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
