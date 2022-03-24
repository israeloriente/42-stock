import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { Report } from 'src/app/interface/report';
import { BackendService } from 'src/app/service/backend.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  // Product list from db
  public product: Product[] = undefined;
  // Report object
  public report: Report = {
    description: '',
    selected: []
  }

  constructor(
    private db: BackendService,
    public global: GlobalService
  ) { }

  ngOnInit() {
    // Get product list from DB
    this.db.getProduct().then((products) => {
      this.product = products;
    }).catch((error) => this.global.showToast(this.db.erroValidators(error)));
  }

  /**
   * Send notify to 42 staff
   * @returns NULL
  */
  public async notify42() {
    this.global.loadInit();
    this.db.reportFromStudent(this.report).then(() => {
      this.resetValues();
      this.global.showAlert('Success', 'Your request has been sent ✅');
      this.global.loadEnd();
    }).catch((error) => {
      this.global.loadEnd();
      this.global.showToast(this.db.erroValidators(error));
    });
  }
  /**
   * Clear report fields
  */
  private resetValues() {
    this.report = { description: '', selected: [] };
    // Set all items isChecked to false
    this.product.map((product) => product.isChecked = false)
  }
  /**
   * Event trigger when checkbox changed
   * @param p - Product Object
  */
  public checkboxChanged(p: Product) {
    if (p.isChecked) this.report.selected.push(p);
    else this.report.selected = this.report.selected.filter((product) => product.id != p.id);
  }

  /**  
    * Check if description has sufficient characters or blocks if it has too much.
    * @returns Boolean validation.
  */
  public get reportIsValid() {
    return this.report.description.length <= 100 &&
      this.report.description.length > 5 &&
      this.report.selected.length
    }

}
