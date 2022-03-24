import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BackendService } from './service/backend.service';
import { GlobalService } from './service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public versionApp: string = environment.VERSION;
  
  constructor(
    private db: BackendService,
    private global: GlobalService
  ) {
    
    // If there is a user session let´s redirect to admin, or go to public component
    this.db.getCurrentUser().then((user) => user ? this.global.goToRoot('admin') : this.global.goToRoot('student') );

  }
}
