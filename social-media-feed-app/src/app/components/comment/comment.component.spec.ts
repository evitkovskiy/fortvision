import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CommentComponent } from './comment.component';
import { IComment } from '../../entities';
import { currentTimestampDate } from 'src/app/shared/functions';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule
      ],
      declarations: [ CommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.currentUser = 'John';
    const comment: IComment = {
      content: 'Hello',
      commenter: 'John',
      timestamp: '6/13/23, 12:44 PM',
    };
    component.comment = comment;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should display the commenter and timestamp', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.comment_header mat-card-subtitle:nth-child(1)').textContent).toContain('John');
    expect(compiled.querySelector('.comment_header mat-card-subtitle:nth-child(2)').textContent).toContain(component.comment.timestamp);
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.onDeleteComment, 'emit');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.comment_header button');
    expect(button).toBeDefined();
    button.click();
    fixture.detectChanges();
    expect(component.onDeleteComment.emit).toHaveBeenCalledWith(component.comment);
  });

  // it('should not display delete button if comment was not made by current user', () => {
  //   const comment: IComment = {
  //     commenter: 'Jane',
  //     timestamp: '6/13/23, 12:44 PM',
  //     content: 'Hello'
  //   };
  //   component.comment = comment;
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   const button = compiled.querySelector('.comment_header button');
  //   expect(button).toBeNull();
  // });

  // it('should display comment content', () => {
  //   const comment: IComment = {
  //     commenter: 'John',
  //     timestamp: currentTimestampDate(),
  //     content: 'Hello'
  //   };
  //   component.comment = comment;
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.comment-content p').textContent).toContain(comment.content);
  // });
});
