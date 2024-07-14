import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutFiltersComponent } from './workout-filters.component';

describe('WorkoutFiltersComponent', () => {
  let component: WorkoutFiltersComponent;
  let fixture: ComponentFixture<WorkoutFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutFiltersComponent]
    });
    fixture = TestBed.createComponent(WorkoutFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
