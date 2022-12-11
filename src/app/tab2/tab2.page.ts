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
    this.dataService.getUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    });

    //ne treba
    this.dataService.getUserById(this.id).subscribe(res => {
      this.user = res;
    });
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }


  async addUser(){
   
    const alert = await this.alertCtrl.create({
      header: 'Add User Info',
      inputs: [{
        name: 'name',
        placeholder: 'Enter name',
        type: 'text'
      },
      {
        name: 'lastName',
        placeholder: 'Enter last name',
        type: 'text'
      },
      {
        name: 'email',
        placeholder: 'Enter email',
        type: 'email'
      },
      {
        name: 'phoneNumber',
        placeholder: 'Enter phone number',
        type: 'text'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: (res) => {
          this.dataService.addUser({name: res.name, lastName: res.lastName, email: res.email, phoneNumber: res.phoneNumber});
        }
      }
    ]
    });
    await alert.present();
  }

  //ne treba
  async updateUser(){
    this.dataService.updateEmployee(this.user);
    const toast = await this.toastCtrl.create({
      message: 'Employee updated!',
      duration: 1000
    });
    toast.present();
  }
}
