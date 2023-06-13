import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, OnDestroy, SkipSelf } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';
import { Watcher } from '../../../classes/watcher';

@Component({
  selector: 'smf-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent extends Watcher implements OnInit, OnDestroy {

  constructor(
    @SkipSelf() public loader: LoaderService,
    private cDRef: ChangeDetectorRef
    ){
      super();
    }

  ngOnInit(): void {
    this.loader.show$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
      this.cDRef.detectChanges();
    })
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
