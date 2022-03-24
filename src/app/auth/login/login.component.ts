import { Component } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // Components controller
  public statusComponent: 'login' | 'reset' = 'login';
  // Objeto usado em "login" component e "reset"
  public user = { email: '', name: '', password: '' }

  constructor(
    private db: BackendService,
    public global: GlobalService) { }

  /**
   * Login function
  */
  async login() {
    await this.global.loadInit();
    this.db.login(this.user.email, this.user.password).then(async () => {
      this.db.userIsAdm().then(async (route) => {
        this.global.goToRoot(route);
        await this.global.loadEnd();
        this.global.showToast('Welcome!', 300);
      }).catch(err => console.log(err));

    }).catch(async error => {
      this.global.showToast(this.db.erroValidators(error));
      await this.global.loadEnd();
    })
  }

  /**
   * Reset password function
   * @param email - Email
  */
  public recoveryPassword() {
    this.db.resetPassword(this.user.email.toLowerCase()).then(() => {
      this.statusComponent = 'login';
      this.global.showAlert('Success', 'Check your email');
    }).catch((error) => this.global.showToast(this.db.erroValidators(error)));
  }


}
