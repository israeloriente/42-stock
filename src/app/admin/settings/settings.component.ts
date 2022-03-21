import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/interface/user';
import { BackendService } from 'src/app/service/backend.service';
import { GlobalService } from 'src/app/service/global.service';
import { QrBannerComponent } from './qr-banner/qr-banner.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  public user: User;

  constructor(
    public db: BackendService,
    private global: GlobalService,
    private modal: ModalController,
    public AC: AppComponent,
  ) { }

  async ngOnInit() {
    this.db.getCurrentUser().then((user: User) => {
      this.user = user;
    });
  }

  /**  
    * Reset password from current user
    * @returns NULL.
  */
  public resetPass() {
    this.global.confirmAlert('Are you sure?', '').then((res) => {
      if (res) {
        this.global.loadInit();
        this.db.resetPassword(this.user.get('email')).then(() => {
          this.global.loadEnd();
          this.global.showToast('Check your email.', 5000);
        }).catch((error) => {
          this.db.erroValidators(error);
          this.global.loadEnd();
        });
      }
    })
  }
  /**  
    * Open QrBannerComponent.
    * @returns NULL.
  */
  public async openBanner() {
    const modal = await this.modal.create({
      component: QrBannerComponent,
      backdropDismiss: true
    });
    return await modal.present();
  }


}
