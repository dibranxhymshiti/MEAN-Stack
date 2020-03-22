import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostListRoutingModule} from './post-list-routing.module';
import {PostListComponent} from './post-list.component';
import {AngularMaterialModule} from '../../angular-material.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    PostListRoutingModule
  ]
})
export class PostListModule {
}
