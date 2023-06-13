import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthComponent } from './auth.component';
import { AuthContainer } from './auth.container';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material';

const routes: Routes = [
  {
    path: '',
    component: AuthContainer
  }
];


@NgModule({
  declarations: [
    AuthComponent,
    AuthContainer
],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),

],
  exports: [AuthComponent, AuthContainer]
})
export class AuthModule {}
