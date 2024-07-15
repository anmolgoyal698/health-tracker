import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HealthWorkoutService } from 'src/app/health-tracker/health-workout.service';

@Component({
  selector: 'app-workout-users-list',
  templateUrl: './workout-users-list.component.html',
  styleUrls: ['./workout-users-list.component.css'],
})
export class WorkoutUsersListComponent {
  usersListSub!: Subscription;
  usersList?: string[];
  constructor(private workoutService: HealthWorkoutService) {}

  ngOnInit(): void {
    this.usersListSub = this.workoutService
      .getWorkoutUsersList()
      .subscribe((data) => {
        this.usersList = data;
      });
  }

  onClickUser(name: string) {
    this.workoutService.setSelectedUser(name);
  }
}
