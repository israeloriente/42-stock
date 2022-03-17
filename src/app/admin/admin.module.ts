import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { ProductComponent } from './product/product.component';
import { CooperatorComponent } from './cooperator/cooperator.component';
import { MailComponent } from './mail/mail.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  declarations: [
    AdminPage,
    ProductComponent,
    CooperatorComponent,
    MailComponent,
    SettingsComponent
  ]
})
export class AdminPageModule {}
