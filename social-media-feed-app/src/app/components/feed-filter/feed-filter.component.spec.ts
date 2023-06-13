import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FeedFilterComponent } from './feed-filter.component';

describe('FeedFilterComponent', () => {
  let component: FeedFilterComponent;
  let fixture: ComponentFixture<FeedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ FeedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should emit search form data on value changes', () => {
    const formValue = { author: 'John', content: 'Hello' };
    const unsubscribe = new Subject();
    spyOn(component.filter, 'emit');
    component.searchForm.setValue(formValue);
    component.searchForm.valueChanges
      .pipe(takeUntil(unsubscribe))
      .subscribe((value) => {
        expect(component.filter.emit).toHaveBeenCalledWith(formValue);
        unsubscribe.next(1);
        unsubscribe.complete();
      });
  });

  it('should initialize with an empty search form', () => {
    expect(component.searchForm.value).toEqual({ author: '', content: '' });
  });

  it('should create search form on initialization', () => {
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm instanceof FormGroup).toBeTruthy();
  });
});
