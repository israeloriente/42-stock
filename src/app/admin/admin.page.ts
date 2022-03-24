import { Component } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  constructor(
    private db: BackendService,
    private global: GlobalService
  ) {

    // Forward user to user type
    this.db.userIsAdm().then((url) => {
      this.global.goToRoot(url);
    }).catch((error) => this.global.showToast(this.db.erroValidators(error)));

  }

}
