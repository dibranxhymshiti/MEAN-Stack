import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [


  {
    path: '',
    loadChildren: () => import('./posts/post-list/post-list.module').then(m => m.PostListModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./posts/post-create/post-create.module').then(m => m.PostCreateModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:postID',
    loadChildren: () => import('./posts/post-create/post-create.module').then(m => m.PostCreateModule),
    canActivate: [AuthGuard]
  },

  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
