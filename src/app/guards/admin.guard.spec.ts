import { inject, TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({
          providers: [AdminGuard]
      });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
      expect(guard).toBeTruthy();
  }));
});
