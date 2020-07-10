import {NgModule} from '@angular/core';
import {MyDialogComponent} from './my-dialog/my-dialog.component';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../angular-material.module';


@NgModule({
  declarations: [
    MyDialogComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    MyDialogComponent
  ]
})
export class SharedModule {
}
