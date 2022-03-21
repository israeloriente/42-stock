import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageStockComponent } from '../components/manage-stock/manage-stock.component';

import { AdminPage } from './admin.page';
import { CooperatorComponent } from './cooperator/cooperator.component';
import { MailComponent } from './mail/mail.component';
import { ProductComponent } from './product/product.component';
import { SettingsComponent } from '../components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'stocks',
        component: ManageStockComponent
      },
      {
        path: 'cooperator',
        component: CooperatorComponent
      },
      {
        path: 'mail',
        component: MailComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
