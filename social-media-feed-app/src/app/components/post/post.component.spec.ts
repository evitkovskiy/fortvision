// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { IComment, IPost } from 'src/app/entities';
// import { PostComponent } from './post.component';

// @Component({
//   selector: 'smf-comment',
//   template: '',
// })
// class MockCommentComponent {
//   @Input() comment!: IComment;
//   @Input() currentUser = '';
//   @Output() onDeleteComment = new EventEmitter();
// }

// @Component({
//   selector: 'smf-new-post-comment',
//   template: '',
// })
// class MockNewPostCommentComponent {
//   @Input() type = '';
//   @Input() textType = '';
//   @Output() onText = new EventEmitter();
// }

// describe('PostComponent', () => {
//   let component: PostComponent;
//   let fixture: ComponentFixture<PostComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [PostComponent, MockCommentComponent, MockNewPostCommentComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PostComponent);
//     component = fixture.componentInstance;

//     const post: IPost = {
//       author: 'John Smith',
//       content: 'Hello world!',
//       timestamp: new Date().toISOString(),
//     };

//     component.post = post;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should trigger onLike when like button is clicked', () => {
//     spyOn(component.onLike, 'emit');
//     const likeButton = fixture.nativeElement.querySelector('.like-button');
//     likeButton.click();

//     expect(component.onLike.emit).toHaveBeenCalledWith(component.post);
//   });

//   it('should trigger onText when new post comment added', () => {
//     spyOn(component.onText, 'emit');
//     const newCommentInput = fixture.nativeElement.querySelector('.new-comment-input textarea');
//     newCommentInput.value = 'New comment';
//     newCommentInput.dispatchEvent(new Event('input'));
//     const newCommentButton = fixture.nativeElement.querySelector('.new-comment-button');
//     newCommentButton.click();

//     expect(component.onText.emit).toHaveBeenCalledWith({
//       text: 'New comment',
//       type: 'comment',
//       post: component.post,
//     });
//   });

//   it('should trigger onDeletePost when delete button clicked by the author', () => {
//     spyOn(component.onDeletePost, 'emit');
//     component.currentUser = component.post.author;
//     fixture.detectChanges();
//     const deleteButton = fixture.nativeElement.querySelector('.delete-button');
//     deleteButton.click();

//     expect(component.onDeletePost.emit).toHaveBeenCalledWith(component.post.id);
//   });

//   it('should show/hide the comments when the corresponding button is clicked', () => {
//     expect(component.showComments).toBeFalse();
//     const showCommentsButton = fixture.nativeElement.querySelector('.show-comments-button');
//     showCommentsButton.click();

//     expect(component.showComments).toBeTrue();
//     const hideCommentsButton = fixture.nativeElement.querySelector('.hide-comments-button');
//     hideCommentsButton.click();

//     expect(component.showComments).toBeFalse();
//   });

//   it('should trigger onDeleteComment when the delete button for a comment is clicked', () => {
//     spyOn(component.onDeleteComment, 'emit');
//     const comment: IComment = {
//       commenter: 'Alice',
//       content: 'Nice post!',
//       timestamp: new Date().toISOString(),
//     };
//     component.post.comments = [comment];
//     fixture.detectChanges();

//     const deleteCommentButton = fixture.nativeElement.querySelector('.delete-comment-button');
//     deleteCommentButton.click();

//     expect(component.onDeleteComment.emit).toHaveBeenCalledWith({
//       comment,
//       post: component.post,
//     });
//   });
// });
