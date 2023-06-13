import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { NewPostCommentComponent } from './new-post-comment.component';

// Modules
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    NewPostCommentComponent
],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
],
  exports: [NewPostCommentComponent],
})
export class NewPostCommentModule {}
