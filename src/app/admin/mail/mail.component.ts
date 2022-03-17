import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';
import { Mail } from 'src/app/interface/mail';
import { BackendService } from 'src/app/service/backend.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html'
})
export class MailComponent {

  // Email list from db
  public email: Mail[] = undefined;
  // Control select view
  public select: boolean = false;
  // Itens selected
  public selectList: Mail[] = [];

  constructor(
    private db: BackendService,
    private modal: ModalController,
    private global: GlobalService,
  ) { }

  ionViewWillEnter() {
    // Get email list
    this.getEmails();
  }
  /**  
    * Get all emails from database.
  */
  public getEmails() {
    this.db.getEmails().then((emails: Mail[]) => {
      this.email = emails;
    }).catch((error) => {
      this.global.showToast(this.db.erroValidators(error), 5000);
      // Lets stop loading <p>
      this.email = [];
    });
  }
  /**  
    * Call up object creation "AddModalComponent"
  */
     public async addEmail() {
      const modal = await this.modal.create({
        component: AddModalComponent,
        backdropDismiss: true,
        componentProps: {
          'type': 'Mail'
        }
      });
  
      modal.onDidDismiss().then(async (res) => {
        if (res.data != undefined) {
          this.getEmails();
          this.global.loadEnd();
        }
      });
      return await modal.present();
    }
  /**  
    * Delete an existent email
    * @param mail - Email to remove.
  */
  public async removeEmail(mail: Mail) {
    if (await this.global.confirmAlert('Are you sure to remove?', 'Unreversible Action')) {
      this.global.loadInit();
      this.db.deleteObject('Mail', mail).then((mail) => {
        this.email = this.email.filter(item => mail.id != item.id);
        this.global.showToast('Successfully removed', 500);
        this.global.loadEnd();
      }).catch(error => {
        this.global.showToast(this.db.erroValidators(error), 5000);
        this.global.loadEnd();
      });
    }
  }
  /**  
    * Remove list of emails "selectList"
  */
  public async removeEmails() {
    if (await this.global.confirmAlert('Are you sure to remove these products?', 'Unreversible Action')) {
      await this.global.loadInit();
      this.selectList.forEach(element => {
        this.db.deleteObject('Mail', element).then(async (res) => {
          this.email = this.email.filter(item => res.id != item.id);
          this.global.showToast('Successfully removed', 500);
          await this.global.loadEnd();
        }).catch(async error => {
          this.global.showToast(this.db.erroValidators(error), 5000);
          await this.global.loadEnd();
        });
      }); 
    }
    // Hide item checkbox
    this.cancelSeletion();
  }

  /**  
    * Trigger when checkbox change value.
    * @param ev - Event.
    * @param index - Index from email list.
    * @returns NULL.
  */
  public checkboxChanged(ev, index: number) {
    ev.target.checked ? this.selectList.push(this.email[index]) : this.selectList = this.selectList.filter(item => item.id != this.email[index].id);
  }
  /**  
    * Hide and clean 'selectList'
    * @returns NULL.
  */
  public cancelSeletion() {
    this.selectList = [];
    this.select = false;
  }

  /**  * When no data arrived from db */
  get noDataFound() { return !this.email?.length && this.email != undefined }
  /**  * When no data arrived but but there is still a response from the server */
  get isLoading() { return !this.email?.length && this.email == undefined }
  /**  * Return true if select option can be activate */
  get canSelect() { return !this.select && this.email?.length }
}