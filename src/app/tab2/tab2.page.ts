import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @Input() id: any;
  users: any;
  user: any;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private navCrtl: NavController
  ){
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  toggleTheme(event: any){
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
    }else{
      document.body.setAttribute('color-theme', 'light')
    }
  }

}
