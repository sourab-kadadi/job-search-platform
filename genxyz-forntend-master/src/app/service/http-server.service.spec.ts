import { TestBed } from '@angular/core/testing';

import { HttpServerService } from './http-server.service';

describe('HttpServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpServerService = TestBed.get(HttpServerService);
    expect(service).toBeTruthy();
  });
});
