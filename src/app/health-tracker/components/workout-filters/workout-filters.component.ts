import { Component } from '@angular/core';
import { WORKOUT_FILTER_OPTIONS } from '../../health-workout.constants';
import { MatSelectChange } from '@angular/material/select';
import { HealthWorkoutService } from '../../health-workout.service';
import { WorkoutFilter } from '../../health-tracker.model';

@Component({
  selector: 'app-workout-filters',
  templateUrl: './workout-filters.component.html',
  styleUrls: ['./workout-filters.component.css'],
})
export class WorkoutFiltersComponent {
  workoutFilterOptions = WORKOUT_FILTER_OPTIONS;
  searchQuery = '';
  workoutFilter: WorkoutFilter = 'All';

  constructor(private healthWorkoutService: HealthWorkoutService) {}

  onSearchQueryChange(event: Event) {
    if (event.target) {
      this.searchQuery = (event.target as HTMLInputElement).value;
      this.healthWorkoutService.setSearchQuery(this.searchQuery);
    }
  }

  onWorkoutFilterChange(event: MatSelectChange) {
    this.workoutFilter = event.value;
    this.healthWorkoutService.setWorkoutFilter(this.workoutFilter);
  }
}
