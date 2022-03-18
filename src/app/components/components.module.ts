import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { AddModalComponent } from './add-modal/add-modal.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { ModalManageStockComponent } from './manage-stock/modal-manage-stock/modal-manage-stock.component';
import { VerifiedSvgComponent } from './verified-svg/verified-svg.component';

@NgModule({
  declarations: [
    ManageStockComponent,
    AddModalComponent,
    ModalManageStockComponent,
    VerifiedSvgComponent
  ],
  imports: [
    BrowserModule,
    IonicModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ ]
})
export class ComponentsModule { }
