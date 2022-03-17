import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';
import { User } from 'src/app/interface/user';
import { BackendService } from 'src/app/service/backend.service';
import { GlobalService } from 'src/app/service/global.service';
@Component({
  selector: 'app-cooperator',
  templateUrl: './cooperator.component.html'
})
export class CooperatorComponent {

  // Users list from db
  public users: User[] = undefined;
  // Control select view
  public select: boolean = false;
  // Itens selected
  public selectList: User[] = [];
  // Prevent two click events on item
  public blockModal: boolean = false;

  constructor(
    private db: BackendService,
    private modal: ModalController,
    private global: GlobalService,
  ) { }

  ionViewWillEnter() {
    // Get user list
    this.getUsers();
  }

  /**  
    * Get all users from database.
  */
  public getUsers() {
    this.db.getUsers().then((user: User[]) => {
      this.users = user;
    }).catch(error => {
      this.global.showToast(this.db.erroValidators(error));
      // Lets stop loading <p>
      this.users = [];
    });
  }

  /**  
    * Call up object creation / update modal
    * @param user - Existent user to update.
  */
  public async openModal(user?) {
    if (!this.blockModal && !this.select) {
      const modal = await this.modal.create({
        component: AddModalComponent,
        backdropDismiss: true,
        componentProps: {
          'type': 'User',
          'param': user
        }
      });
      // When dismiss let's check if has updates
      modal.onDidDismiss().then(async (res) => {
        if (res.data != undefined) {
          this.getUsers();
          this.global.loadEnd();
        }
      });
      return await modal.present();
    }
  }
  /**  
    * Delete an existent user
    * @param user - User to remove.
  */
  public async deleteUser(user: User) {
    this.blockModal = true;
    if (await this.global.confirmAlert('Are you sure to remove?', 'Unreversible Action')) {
      this.global.loadInit();
      this.db.deleteUserCloud(user).then((user) => {
        this.users = this.users.filter(item => user.id != item.id);
        this.global.showToast('Successfully removed', 500);
        this.global.loadEnd();
      }).catch(error => {
        this.global.showToast(this.db.erroValidators(error), 5000);
        this.global.loadEnd();
      });
    }
    // Allow opening of the 'AddModalComponent' modal
    this.blockModal = false;
  }
  /**  
    * Remove list of users "selectList"
  */
  public async deleteUsers() {
    if (await this.global.confirmAlert('Are you sure to remove these users?', 'Unreversible Action')) {
      await this.global.loadInit();
      this.selectList.forEach(user => {
        this.db.deleteUserCloud(user).then(async (res) => {
          this.users = this.users.filter(item => res.id != item.id);
          this.global.showToast('Successfully removed', 500);
          await this.global.loadEnd();
        }).catch(async error => {
          this.global.showToast(this.db.erroValidators(error), 5000);
          await this.global.loadEnd();
        });
      });
      // Hide item checkbox
      this.cancelSeletion();
    }
  }
  /**  
    * Trigger when checkbox change value.
    * @param ev - Event.
    * @param index - Index from user list.
    * @returns NULL.
  */
  public checkboxChanged(ev, index: number) {
    // If it is not selected we will add it to the list, otherwise we will remove it.
    ev.target.checked ? this.selectList.push(this.users[index]) : this.selectList = this.selectList.filter(item => item.id != this.users[index].id);
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
  get noDataFound() { return !this.users?.length && this.users != undefined }
  /**  * When no data arrived but but there is still a response from the server */
  get isLoading() { return !this.users?.length && this.users == undefined }
  /**  * Return true if select option can be activate */
  get canSelect() { return !this.select && this.users?.length }

}
