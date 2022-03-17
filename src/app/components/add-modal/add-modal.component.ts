import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Mail } from 'src/app/interface/mail';
import { Product } from 'src/app/interface/product';
import { BackendService } from 'src/app/service/backend.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent {

  public type: 'Mail' | 'Product';
  public param;

  public product: Product = {
    name: '',
    barcodeId: ''
  }

  constructor(
    private db: BackendService,
    public modal: ModalController,
    private global: GlobalService,
    private params: NavParams,
  ) {

  this.type = this.params.get('type');
  this.param = this.params.get('param');

  switch (this.type) {
    case 'Product':
      if (this.param)
        this.product = { name: this.param.get('name'), barcodeId: this.param.get('barcodeId'), id: this.param.id}
      break;
  
    default:

      break;
  }

  }
  /**  
    * Save or update a Parse Object
    * "type" define which class control
    * @returns NULL.
  */
  public saveObject() {
    this.global.loadInit();
    switch (this.type) {
      case 'Product':
        if (this.product.id)
          this.db.updateProduct(this.product).then((res) => {
            this.modal.dismiss(res);
          }).catch(error => {
            this.global.showToast(this.db.erroValidators(error), 5000);
            this.global.loadEnd();
          });
        else
        this.db.createProduct(this.product).then((res) => {
          this.modal.dismiss(res);
        }).catch(error => {
          this.global.showToast(this.db.erroValidators(error), 5000);
          this.global.loadEnd();
        });
        break;
    
      default:
        this.global.loadEnd();
        break;
    }
  }

}
