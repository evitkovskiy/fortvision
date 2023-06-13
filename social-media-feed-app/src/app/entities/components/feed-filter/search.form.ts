import { AbstractControl, ValidationErrors } from '@angular/forms';

export class SearchForm {
  author: (string | ((control: AbstractControl) => ValidationErrors)[])[];
  content: (string | ((control: AbstractControl) => ValidationErrors)[])[];


  constructor() {
    this.author = [''];
    this.content = [''];
  }
}
