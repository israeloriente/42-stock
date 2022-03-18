import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';
import { Product } from 'src/app/interface/product';
import { BackendService } from 'src/app/service/backend.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {

  // Product list from db
  public products: Product[] = undefined;
  // Control select view
  public select: boolean = false;
  // Itens selected
  public selectList: Product[] = [];
  // Prevent two click events on item
  public blockModal: boolean = false;

  constructor(
    private db: BackendService,
    private modal: ModalController,
    private global: GlobalService,
  ) { }

  ionViewWillEnter() {
    // Get product list
    this.getProduct();
  }

  /**  
    * Get all products from database.
  */
  public getProduct() {
    this.db.getProduct().then((products: Product[]) => {
      this.products = products;
    }).catch(error => {
      this.global.showToast(this.db.erroValidators(error));
      // Lets stop loading <p>
      this.products = [];
    });
  }

  /**  
    * Call up object creation / update modal
    * @param product - Existent product to update.
  */
  public async openModal(product?) {
    if (!this.blockModal && !this.select) {
      const modal = await this.modal.create({
        component: AddModalComponent,
        backdropDismiss: true,
        componentProps: {
          'type': 'Product',
          'param': product
        }
      });
      // When dismiss let's check if has updates
      modal.onDidDismiss().then(async (res) => {
        if (res.data != undefined) {
          this.getProduct();
          this.global.loadEnd();
        }
      });
      return await modal.present();
    }
  }
  /**  
    * Delete an existent product
    * @param product - Product to remove.
  */
  public async deleteProduct(product: Product) {
    this.blockModal = true;
    if (await this.global.confirmAlert('Are you sure to remove?', 'Unreversible Action')) {
      this.global.loadInit();
      this.db.deleteObject('Product', product).then((product) => {
        this.products = this.products.filter(item => product.id != item.id);
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
    * Remove list of products "selectList"
  */
  public async deleteProducts() {
    if (await this.global.confirmAlert('Are you sure to remove these products?', 'Unreversible Action')) {
      await this.global.loadInit();
      this.selectList.forEach(element => {
        this.db.deleteObject('Product', element).then(async (res) => {
          this.products = this.products.filter(item => res.id != item.id);
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
    * @param index - Index from product list.
    * @returns NULL.
  */
  public checkboxChanged(ev, index: number) {
    // If it is not selected we will add it to the list, otherwise we will remove it.
    ev.target.checked ? this.selectList.push(this.products[index]) : this.selectList = this.selectList.filter(item => item.id != this.products[index].id);
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
  get noDataFound() { return !this.products?.length && this.products != undefined }
  /**  * When no data arrived but but there is still a response from the server */
  get isLoading() { return !this.products?.length && this.products == undefined }
  /**  * Return true if select option can be activate */
  get canSelect() { return !this.select && this.products?.length }

}
