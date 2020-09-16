import { TestBed } from '@angular/core/testing';

import { SurvivorsService } from './survivors.service';

describe('SurvivorsService', () => {
  let service: SurvivorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurvivorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
