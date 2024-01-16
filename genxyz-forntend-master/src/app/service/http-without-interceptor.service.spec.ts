import { TestBed } from '@angular/core/testing';

import { HttpWithoutInterceptorService } from './http-without-interceptor.service';

describe('HttpWithoutInterceptorService', () => {
  let service: HttpWithoutInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpWithoutInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
