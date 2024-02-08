import { TestBed } from '@angular/core/testing';

import { CharactersActionsService } from './characters-actions.service';

describe('CharactersActionsService', () => {
  let service: CharactersActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactersActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
