import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'smf-page-not-found',
  template: `
    <smf-page-not-found-component
      (goHome)="goHome($event)"
    >
    </smf-page-not-found-component>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundContainer {

  constructor(private router: Router) {}

  goHome(event: boolean): void {
    if(event) {
      this.router.navigate(['/']);
    }
  }
}
