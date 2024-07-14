import { Component, OnInit } from '@angular/core';
import { WORKOUT_OPTIONS } from '../../health-workout.constants';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HealthWorkoutService } from '../../health-workout.service';

@Component({
  selector: 'app-add-workout-form',
  templateUrl: './add-workout-form.component.html',
  styleUrls: ['./add-workout-form.component.css'],
})
export class AddWorkoutFormComponent implements OnInit {
  workoutOptions = WORKOUT_OPTIONS;

  title = 'app';

  workoutForm!: FormGroup;

  constructor(private healthWorkoutService: HealthWorkoutService) {}

  ngOnInit(): void {
    this.workoutForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      workoutType: new FormControl('Running', [Validators.required]),
      workoutMinutes: new FormControl(null, [
        Validators.required,
        this.positiveNumberValidator(),
      ]),
    });
  }

  onSubmit() {
    if (this.workoutForm.invalid) {
      return;
    }

    const { username, workoutType, workoutMinutes } = this.workoutForm.value;

    this.healthWorkoutService.addWorkoutItem(
      username,
      workoutType,
      workoutMinutes
    );

    this.workoutForm.reset();
  }

  positiveNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = control.value > 0;
      return isValid ? null : { positiveNumber: { value: control.value } };
    };
  }
}
