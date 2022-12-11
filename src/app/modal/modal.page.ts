import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Employee } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: any;
  employee: any;
  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.dataService.getEmployeeById(this.id).subscribe(res => {
      this.employee = res;
    });
  }

  async updateEmployee(){
    this.dataService.updateEmployee(this.employee);
    const toast = await this.toastCtrl.create({
      message: 'Employee updated!',
      duration: 1000
    });
    toast.present();
  }

  async deleteEmployee(){
    await this.dataService.deleteEmployee(this.employee);
    this.modalCtrl.dismiss();
  }
}
