import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignupRoutingModule} from './signup-routing.module';
import {SignupComponent} from './signup.component';
import {AngularMaterialModule} from '../../angular-material.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    AngularMaterialModule,
    FormsModule,
    SignupRoutingModule,
    SharedModule
  ]
})
export class SignupModule {
}
