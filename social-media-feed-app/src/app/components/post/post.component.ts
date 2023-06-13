import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IComment, IPost } from 'src/app/entities';
import { trackItem } from 'src/app/shared/functions/functions';

@Component({
  selector: 'social-media-feed-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {

  @Input() post!: IPost;
  @Input() currentUser = '';
  @Output() onLike = new EventEmitter();
  @Output() onText = new EventEmitter();
  @Output() onDeletePost = new EventEmitter();
  @Output() onDeleteComment = new EventEmitter();
  @Output() onSharePost = new EventEmitter();


  trackItem = trackItem;
  showComments = false;

  textAssignWithPostId(commentEvent: {text: string, type: string}): void {
    this.onText.emit({...commentEvent, post: this.post})
  }

  commentAssignWithPostId(comment: IComment): void {
    this.onDeleteComment.emit({comment, post: this.post})
  }

  checkIfUserLiked(): boolean {
    return !!(this.post.likes && this.post.likes.usersLiked.includes(this.currentUser))
  }

  hasComments(): boolean {
    return !!(this.post.comments && this.post.comments.length)
  }

}
