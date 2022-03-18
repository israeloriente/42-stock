import { Injectable } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  // Load global
  private loading;

  constructor(
    private nav: NavController,
    private load: LoadingController,
    private alert: AlertController,
    private toast: ToastController) { }


  /**  
    * Navigate between pages with Angular Router
    * @param url - Router.
    * @returns NULL.
  */
  public goTo(url) { this.nav.navigateForward(url) }

  async loadInit() {
    this.loading = await this.load.create({
      duration: 8000
    });
    await this.loading.present();
  }

  async loadEnd() {
    await this.loading.dismiss();
  }

  /**  
    * @param message - The first input is the message to present.
    * @param time - The second input define the time (ms)
    * @returns NULL
  */
  async showToast(message: string, time?: number) {
    const toast = await this.toast.create({
      message: message,
      position: 'bottom',
      duration: time || 3000
    });
    toast.present();
  }

  /**  
    * @param title - Title message.
    * @param msg - Description.
    * @param cancel - Optional name for abortion button.
    * @param confirm - Optional name for confirm button.
    * @returns Boolean user response.
  */
  async confirmAlert(title, msg, cancel?, confirm?) {
    let bool: boolean;
    const alert = await this.alert.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: cancel || 'Cancel',
          handler: () => { bool = false }
        }, {
          text: confirm || 'Ok',
          handler: () => { bool = true }
        }
      ]
    });
    await alert.present();
    await alert.onWillDismiss();
    return bool;
  }

  /**
   * Prevent space character
   * REGEX.
  */
  public removeSpaces(str: string) {
    return str.replace(/\s/g, '');
  }


  // @@@@@@@@@@ Storage  @@@@@@@@@
  /**
   * Get data from localStorage.
  */
  async getStorage(key: string): Promise<any> {
    return await JSON.parse(localStorage.getItem(key));
  }
  /**
   * Save data in localStorage.
  */
  async setStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  /**
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
  */
  async removeItem(value: any) {
    localStorage.removeItem(value);
  }
  /**
   * Clean all data from localStorage and sessionStorage.
  */
  async resetStorage() {
    await localStorage.clear();
  }
}
