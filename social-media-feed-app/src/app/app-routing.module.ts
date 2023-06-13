import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'feed',
      pathMatch: 'full'
  },
  {
      path: 'login',
      loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
  },
  {
      path: 'feed',
      loadChildren: () => import('./views/feed/feed.module').then(m => m.FeedModule),
      canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./views/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
