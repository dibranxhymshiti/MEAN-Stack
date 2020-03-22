import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {AngularMaterialModule} from '../../angular-material.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
