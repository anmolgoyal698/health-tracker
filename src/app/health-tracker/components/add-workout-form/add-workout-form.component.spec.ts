import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkoutFormComponent } from './add-workout-form.component';

describe('AddWorkoutFormComponent', () => {
  let component: AddWorkoutFormComponent;
  let fixture: ComponentFixture<AddWorkoutFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWorkoutFormComponent]
    });
    fixture = TestBed.createComponent(AddWorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
