import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostCreateComponent} from './post-create.component';


const routes: Routes = [
  {path: '', component: PostCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostCreateRoutingModule {
}
