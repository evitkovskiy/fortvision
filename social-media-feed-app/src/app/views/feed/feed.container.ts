import { Component, OnInit, SkipSelf } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Observable, of } from 'rxjs';
import { map, switchMap, takeUntil, tap} from 'rxjs/operators';

// Classes
import { Watcher } from '../../classes/watcher';

// Services
import { SnackbarService, LoaderService } from '../../shared/services';
import { AuthService, PostService } from '../../core';

// Interfaces
import { IComment, IPost, ISearch } from '../../entities';

// Models
import { SnackbarMessageType } from '../../shared/models';

// Functions
import { currentTimestampDate } from '../../shared/functions';
import { addComment, deleteComment, updateLikes } from 'src/app/functions/posts.funtions';

import { BASE_URL } from '../../config';

@Component({
  selector: 'smf-feed',
  template: `
    <smf-feed-component
      [posts]="posts | async"
      [currentUser]="currentUser"
      (onLike)="likePost($event)"
      (onText)="addEntity($event)"
      (filter)="postFiltering($event)"
      (loadMorePosts)="loadMorePosts($event)"
      (onDeletePost)="deletePost($event)"
      (onDeleteComment)="deleteComment($event)"
      (onSharePost)="sharePost($event)"
    >
    </smf-feed-component>
  `
})
export class FeedContainer extends Watcher implements OnInit {

  startIndex = 0;
  endIndex = 3;
  posts!: Observable<IPost[]>;
  currentUser = '';

  constructor(
    @SkipSelf() private postService: PostService,
    @SkipSelf() private authService: AuthService,
    @SkipSelf() private snackbarService: SnackbarService,
    @SkipSelf() private loader: LoaderService,
    private clipboard: Clipboard
    ) {
      super();
    }

  ngOnInit(): void {
    this.posts = this.getPosts(this.startIndex, this.endIndex);
    this.currentUser = this.authService.getLogin();
  }

  getPosts(startIndex: number, endIndex: number): Observable<IPost[]> {
    this.loader.show();
    return this.postService.getPosts(startIndex, endIndex).pipe(tap(() => this.loader.hide())
);
  }

  addEntity({ type, text, post }: { type: 'comment' | 'post'; text: string; post?: IPost }): void {
    switch (type) {
      case 'comment':
        this.addComment(text, post!);
        break;
      case 'post':
        this.addPost(text);
        break;
      default:
        break;
    }
  }

  addPost(content: string): void {
    const data = {
      content,
      author: this.currentUser,
      timestamp: currentTimestampDate(),
    };
    this.postService.addPost(data).pipe(
      switchMap(() => this.reloadPosts('Posts have been added')),
      takeUntil(this.unsubscribe)
    ).subscribe();
  }

  addComment(content: string, post: IPost): void {
    const data = addComment(content, post, this.currentUser);
    this.changeComments(data, post.id!, 'Comment has been added');
  }

  deleteComment({comment, post}: {comment: IComment, post: IPost}): void {
    const data = deleteComment({comment, post}) as IComment[];
    this.changeComments(data, post.id!, 'Comment has been deleted');
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId)
      .pipe(
        switchMap(() => this.reloadPosts('Post has been deleted')),
        takeUntil(this.unsubscribe)
      )
      .subscribe();
  }

  postFiltering(filtering: ISearch): void {
    this.loader.show();
    this.postService.filteringPost(filtering, 0, this.endIndex)
      .pipe(
        tap((updatePosts: IPost[]) => {
          this.posts = of(updatePosts);
          this.loader.hide();
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe();
  }

  likePost(post: IPost): void {
    this.postService.changeLikes(post.id as number, updateLikes(post, this.currentUser))
      .pipe(
        switchMap(() => this.reloadPosts()),
        takeUntil(this.unsubscribe)
      )
      .subscribe()
  }

  loadMorePosts(postsLength: number): void {
    if(postsLength < this.endIndex) return;
    this.loader.show();
    this.startIndex += 3;
    this.endIndex += 3
    this.postService.getPosts(this.startIndex, this.endIndex)
      .pipe(
        switchMap((newPosts: IPost[]) =>
          this.posts.pipe(map((posts: IPost[]) => [...posts, ...newPosts]))
        ),
        tap((updatePosts: IPost[]) => {
          this.posts = of(updatePosts);
          this.loader.hide();
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe()
  }

  sharePost(postId: number): void {
    const link = `${BASE_URL}/${postId}`;
    this.clipboard.copy(link);
    this.snackbarService.open('Link is copied', SnackbarMessageType.Success);
  }

  private changeComments(comments: IComment[], postId: number, action: string): void {
    this.postService.changeComments(comments, postId)
    .pipe(
      switchMap(() => this.reloadPosts(action)),
      takeUntil(this.unsubscribe)
    )
    .subscribe();
  }

  private reloadPosts(action?: string): any {
    return this.getPosts(0, this.endIndex)
      .pipe(
        tap((updatePosts: IPost[]) => {
          this.posts = of(updatePosts);
          if (action) {
            this.snackbarService.open(`${action}`, SnackbarMessageType.Success);
          }
        }),
      )
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
