import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

// Form
import { PostCommentForm } from '../../entities/post-comment.form';

@Component({
  selector: 'smf-new-post-comment',
  templateUrl: './new-post-comment.component.html',
  styleUrls: ['./new-post-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPostCommentComponent {

  @Input() type!: string;
  @Input() textType!: string;
  @Output() onText = new EventEmitter()
  postCommentForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postCommentForm = this.fb.group(new PostCommentForm);
  }

  get control(): { [key: string]: AbstractControl } {
    return this.postCommentForm.controls;
  }


  getTextErrorMessage(): string {
    return this.control['text'].hasError('required')
      ? 'Field has been required'
      : '';
  }


}
