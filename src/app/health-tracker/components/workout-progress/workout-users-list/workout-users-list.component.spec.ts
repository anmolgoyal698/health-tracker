import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutUsersListComponent } from './workout-users-list.component';

describe('WorkoutUsersListComponent', () => {
  let component: WorkoutUsersListComponent;
  let fixture: ComponentFixture<WorkoutUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutUsersListComponent]
    });
    fixture = TestBed.createComponent(WorkoutUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
