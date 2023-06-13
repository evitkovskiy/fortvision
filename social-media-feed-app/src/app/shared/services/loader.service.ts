import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private showSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show(): void {
    this.showSpinner$.next(true);
  }

  hide(): void {
    this.showSpinner$.next(false);
  }

  get show$() {
    return this.showSpinner$.asObservable();
  }

  get isShown() {
    return this.showSpinner$.getValue();
  }
}
