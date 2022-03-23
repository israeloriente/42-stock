import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentPageRoutingModule } from './student-routing.module';

import { StudentPage } from './student.page';
import { AboutComponent } from './about/about.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
  ],
  declarations: [
    StudentPage,
    AboutComponent,
    ReportComponent
  ]
})
export class StudentPageModule {}
