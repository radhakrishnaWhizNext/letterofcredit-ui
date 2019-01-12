import { TestBed } from '@angular/core/testing';

import { LetterofcreditService } from './letterofcredit.service';

describe('LetterofcreditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LetterofcreditService = TestBed.get(LetterofcreditService);
    expect(service).toBeTruthy();
  });
});
