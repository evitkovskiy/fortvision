import { Component, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';

// Classes
import { Watcher } from '../../classes/watcher';

// Forms
import { SearchForm, ISearch } from '../../entities';


@Component({
  selector: 'smf-feed-filter',
  templateUrl: './feed-filter.component.html' ,
  styleUrls: ['./feed-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedFilterComponent extends Watcher implements OnInit, OnDestroy {

  @Output() filter = new EventEmitter();

  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.searchForm = this.fb.group(new SearchForm);
  }

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
       )
      .subscribe((formValue: ISearch) => this.filter.emit(formValue));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
