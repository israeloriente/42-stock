import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '../components/settings/settings.component';
import { ManageStockComponent } from '../components/manage-stock/manage-stock.component';

import { CooperatorPage } from './cooperator.page';

const routes: Routes = [
  {
    path: '',
    component: CooperatorPage,
    children: [
      {
        path: 'stocks',
        component: ManageStockComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: '',
        redirectTo: 'stocks',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CooperatorPageRoutingModule {}
