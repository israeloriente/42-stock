import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CooperatorPageRoutingModule } from './cooperator-routing.module';

import { CooperatorPage } from './cooperator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CooperatorPageRoutingModule
  ],
  declarations: [
    CooperatorPage
  ]
})
export class CooperatorPageModule {}
