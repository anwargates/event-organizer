import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { profileResolverResolver } from './profile-resolver.resolver';

describe('profileResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => profileResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
