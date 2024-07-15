import { Component, Input, OnInit } from '@angular/core';
import { HealthWorkoutService } from '../../health-workout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-progress',
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.css'],
})
export class WorkoutProgressComponent implements OnInit {
  workoutChartDataSub!: Subscription;

  workoutChartLabels!: string[];
  workoutChartData: any;
  constructor(private healthWorkoutService: HealthWorkoutService) {}

  ngOnInit(): void {
    this.workoutChartDataSub = this.healthWorkoutService
      .getWorkoutChartsData()
      .subscribe((data: any) => {
        if (data) {
          this.workoutChartLabels = Object.keys(data);
          this.workoutChartData = [
            { data: Object.values(data), label: 'Minutes' },
          ];
        }
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.workoutChartDataSub.unsubscribe();
  }
}
