import { TestBed } from '@angular/core/testing';

import { Watcher } from './watcher';

describe('Watcher', () => {
  let watcher: Watcher;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Watcher] });
    watcher = TestBed.inject(Watcher);
  });

  afterEach(() => {
    watcher.ngOnDestroy();
  });

  it('should create the service', () => {
    expect(watcher).toBeTruthy();
  });

  it('should unsubscribe', () => {
    spyOn(watcher['unsubscribe'], 'next');
    spyOn(watcher['unsubscribe'], 'complete');
    watcher.ngOnDestroy();
    expect(watcher['unsubscribe'].next).toHaveBeenCalledWith(1);
    expect(watcher['unsubscribe'].complete).toHaveBeenCalled();
  });
});
