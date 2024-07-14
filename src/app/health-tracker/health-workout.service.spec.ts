import { TestBed } from '@angular/core/testing';

import { HealthWorkoutService } from './health-workout.service';

describe('HealthWorkoutService', () => {
  let service: HealthWorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthWorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
