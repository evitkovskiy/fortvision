import { Component, EventEmitter, HostListener, Input, OnDestroy, Output, ChangeDetectionStrategy } from '@angular/core';

// Interfaces
import { IPost } from '../../entities';

// Functions
import { trackItem } from 'src/app/shared/functions/functions';

@Component({
  selector: 'smf-feed-component',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnDestroy {

  @Input() posts!: IPost[] | null;
  @Input() currentUser = '';
  @Output() filter = new EventEmitter();
  @Output() loadMorePosts = new EventEmitter();
  @Output() onLike = new EventEmitter();
  @Output() onText = new EventEmitter();
  @Output() onDeletePost = new EventEmitter();
  @Output() onDeleteComment = new EventEmitter();
  @Output() onSharePost = new EventEmitter();


  trackItem = trackItem;
  showAddPostComponent = false;

  constructor() {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (this.posts && 0.5 > max - pos) {
      this.loadMorePosts.emit(this.posts?.length);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

}
