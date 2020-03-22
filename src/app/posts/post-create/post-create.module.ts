import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostCreateRoutingModule} from './post-create-routing.module';
import {PostCreateComponent} from './post-create.component';
import {AngularMaterialModule} from '../../angular-material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PostCreateComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PostCreateRoutingModule
  ]
})
export class PostCreateModule {
}
