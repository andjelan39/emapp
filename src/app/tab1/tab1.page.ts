import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  employees: any;

  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getEmployees().subscribe(res => {
      console.log(res);
      this.employees = res;
    });
  }

  async openEmployee(employee: any){
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {id: employee.id},
        breakpoints:[0, 0.5, 0.8],
        initialBreakpoint: 0.5
      });
      modal.present();
  }

  async addEmployee(){
    const alert = await this.alertCtrl.create({
      header: 'Add Employee',
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
        name: 'department',
        placeholder: 'Enter deparment',
        type: 'text'
      },
      {
        name: 'salary',
        placeholder: 'Enter salary ',
        type: 'number'
      },
      {
        name: 'address',
        placeholder: 'Enter address',
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
          this.dataService.addEmployee({name: res.name, lastName: res.lastName, department: res.department,
            salary: res.salary, address: res.address, email: res.email, phoneNumber: res.phoneNumber});
        }
      }
    ]
    });
    await alert.present();
  }
}
