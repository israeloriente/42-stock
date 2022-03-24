import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Product } from 'src/app/interface/product';
import { BackendService } from 'src/app/service/backend.service';
import { Events } from 'src/app/service/events';
import { GlobalService } from 'src/app/service/global.service';
import { ModalManageStockComponent } from './modal-manage-stock/modal-manage-stock.component';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.scss'],
})
export class ManageStockComponent {

  public products: Product[] = undefined;

  constructor(
    private db: BackendService,
    private modal: ModalController,
    private global: GlobalService,
    public actionSheetController: ActionSheetController,
    public ev: Events
  ) { }

  /**
    * Trigger every time the user views the page.
  */
  ionViewWillEnter() {
    //  ZEBRA subscribe event
    this.ev.subscribe('data:scan', async (data: any) => {
      let codeScanned = data.scanData.extras["com.symbol.datawedge.data_string"];
      // Get data scanned and check if exist product
      let product = this.products.filter((product) => product.get('barcodeId') == codeScanned )[0];
      // If exist open ask else show not found
      product ? this.askAction(product) : this.global.showToast('Product not found');
    });
    // Get products from db.
    this.getProduct();
  }
  /**
    * Trigger every time the user views the page.
  */
  ionViewWillLeave() { this.ev.destroy('data:scan') }

  /**
    * Determines whether to Restock or to Use.
    * Case select someone will open openManageModal.
    * @param product - Product Parse Object.
  */
  async askAction(product: Product) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      buttons: [
        {
          text: 'Use "'+product.get('name')+'"',
          role: 'destructive',
          icon: 'share-outline',
          id: 'delete-button',
          handler: () => { this.openManageModal(product, 'rm') }
        },
        {
          text: 'Restock',
          icon: 'download-outline',
          id: 'delete-button',
          handler: () => { this.openManageModal(product, 'add') }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => { }
        }]
    });
    await actionSheet.present();
  }

  /**
    * Get product list from db and count how many stocks exist
    * @returns NULL
  */
  public getProduct(): void {
    this.db.getProduct().then((products: Product[]) => {
      this.products = products;
      for (let i = 0; i < products.length; i++) {
        this.db.countStock(this.products[i]).then((qtd: number) => {
          this.products[i].qtd = qtd;
        }).catch((error) => {
          this.products[i].qtd = 0;
          this.global.showToast(this.db.erroValidators(error), 5000);
        });
      }
    }).catch((error) => this.global.showToast(this.db.erroValidators(error), 5000));
  }

  /**
    * Open ModalManageStockComponent
    * @param product - Product Object.
    * @param action - Determines whether to remove or add products.
  */
  private async openManageModal(product: Product, action: 'add' | 'rm') {
    const modal = await this.modal.create({
      component: ModalManageStockComponent,
      initialBreakpoint: 0.3,
      backdropDismiss: true,
      componentProps: {
        'product': product,
        'action': action
      }
    });
    // When the modal is closed let's check if any parameters are coming
    // If any object has been modified, lets update screen
    modal.onDidDismiss().then(async (res) => {
      if (res.data != undefined) {
        // If value is > 1 we got some error
        if (res.data) this.global.showToast(res.data + ' errors found', 5000);
        this.getProduct();
      }
    });
    return await modal.present();
  }

  /**  * When no data arrived from db */
  get noProductFound() { return !this.products?.length && this.products != undefined }
  /**  * When no data arrived but but there is still a response from the server */
  get isLoading() { return !this.products?.length && this.products == undefined }
}
