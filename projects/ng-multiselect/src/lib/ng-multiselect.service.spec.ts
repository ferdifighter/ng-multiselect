import { TestBed } from '@angular/core/testing';

import { NgMultiselectService } from './ng-multiselect.service';

describe('NgMultiselectService', () => {
  let service: NgMultiselectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMultiselectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
