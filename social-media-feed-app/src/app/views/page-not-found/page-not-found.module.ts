import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; // импортируем MatIconModule



// Components
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundContainer } from './page-not-found.container';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material';

export const routes: Routes = [
  {
    path: '',
    component: PageNotFoundContainer,
    pathMatch: 'full',
  }
]

@NgModule({
  declarations: [
    PageNotFoundComponent,
    PageNotFoundContainer
],
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [PageNotFoundComponent, PageNotFoundContainer]
})
export class PageNotFoundModule {}
