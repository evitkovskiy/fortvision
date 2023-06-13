import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LoaderComponent } from './loader.component';

import { MaterialModule } from 'src/app/material';




@NgModule({
  declarations: [
    LoaderComponent
],
  imports: [
    CommonModule,
    MaterialModule,

],
  exports: [LoaderComponent]
})
export class LoaderModule {}
