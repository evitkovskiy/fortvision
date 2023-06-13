import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class PostCommentForm {
  text: (string | ((control: AbstractControl) => ValidationErrors)[])[];


  constructor() {
    this.text = ['', [Validators.required] as ((control: AbstractControl) => ValidationErrors)[]];
  }
}
