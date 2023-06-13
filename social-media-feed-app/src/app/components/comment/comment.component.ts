import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

// Interfaces
import { IComment } from '../../entities';

@Component({
  selector: 'smf-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  @Input() comment!: IComment;
  @Input() currentUser!: string;
  @Output() onDeleteComment = new EventEmitter();
}
