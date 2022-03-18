import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Product } from 'src/app/interface/product';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-modal-manage-stock',
  templateUrl: './modal-manage-stock.component.html',
  styleUrls: ['./modal-manage-stock.component.scss']
})
export class ModalManageStockComponent implements OnInit {

  // Product selected
  public product: Product = undefined;
  // Action of component
  public action: 'add' | 'rm' = undefined;
  // Quantity to Add / Delete
  public qtd: number = 1;
  // Objects success
  public sent: number = 0;
  // Objects fail
  public erros: number = 0;
  // Control send component
  public sending: boolean = false;

  constructor(
    private db: BackendService,
    public modal: ModalController,
    private params: NavParams
  ) { }

  /** * Run only one time after constructor load */
  ngOnInit(): void { this.product = this.params.get('product') }

  /**
    * Process request with the required amount of times 
    * @returns NULL.
  */
  public async process() {
    if (!this.cannotCreate && !this.cannotRemove) {
      this.sending = true;
      for (let i = 0; i < this.qtd; i++) {
        if (this.willAdd) {
          await this.db.createStock(this.product)
            .then(() => {
              this.sent++;
            })
            .catch(() => this.erros++);
        }
        else if (this.willRemove) {
          await this.db.deleteFirstStock(this.product)
            .then(() => this.sent++)
            .catch(() => this.erros++);
        }
      }
      this.waitAnimationAndClose();
    }
  }
  /**
    * Wait for the animation to run and close modal
  */
  private waitAnimationAndClose() {
    setTimeout(() => this.modal.dismiss(this.erros), 1000);
  }

  /** * True if the component's action is to add */
  public get willAdd() { return this.action == 'add' }
  /** * Return percent used in progress-bar */
  public get percent() { return (this.sent / this.qtd) }
  /** * True if all objects were sent  */
  public get verified() { return (this.sent == this.qtd) }
  /** * True if cannot to remove objects */
  public get cannotRemove() { return !this.hasStock && this.willRemove }
  /** * True if cannot to create objects */
  public get cannotCreate() { return this.maxExceeded && this.willAdd }
  /** * True if Stock exists for all picks  */
  private get hasStock() { return (this.qtd <= this.product.qtd) }
  /** * True if MAX numbers has been exceeded  */
  private get maxExceeded() { return (this.qtd >= 100) }
  /** * True if the component's action is to remove */
  private get willRemove() { return this.action == 'rm' }

}
