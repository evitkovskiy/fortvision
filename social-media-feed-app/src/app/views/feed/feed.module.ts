import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';

// Material
import { MaterialModule } from 'src/app/material';


// Modules
import { NewPostCommentModule } from 'src/app/shared/components';

// Components
import { FeedComponent } from './feed.component';
import { FeedContainer } from './feed.container';
import { PostComponent, CommentComponent, FeedFilterComponent } from '../../components';
import { PostService } from 'src/app/core';

export const routes: Routes = [
  {
    path: '',
    component: FeedContainer,
    pathMatch: 'full',
  }
]

@NgModule({
  declarations: [
    FeedComponent,
    FeedContainer,
    PostComponent,
    CommentComponent,
    FeedFilterComponent
],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NewPostCommentModule,
    MaterialModule,
    ClipboardModule
  ],
  providers: [PostService],
  exports: [FeedComponent, FeedContainer]
})
export class FeedModule {}
