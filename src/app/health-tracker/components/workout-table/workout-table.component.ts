import { Component, ViewChild } from '@angular/core';
import { HealthWorkoutService } from '../../health-workout.service';
import { IWorkoutTableItem } from '../../health-tracker.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-workout-table',
  templateUrl: './workout-table.component.html',
  styleUrls: ['./workout-table.component.css'],
})
export class WorkoutTableComponent {
  displayedColumns: string[] = [
    'name',
    'workouts',
    'totalWorkouts',
    'totalMins',
  ];

  workoutTableSource: any;

  workoutTableSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private healthWorkoutService: HealthWorkoutService) {}

  ngOnInit() {
    this.healthWorkoutService.initWorkoutList();

    this.workoutTableSubscription = this.healthWorkoutService
      .getWorkoutTableObservable()
      .subscribe((data) => {
        this.workoutTableSource = new MatTableDataSource<IWorkoutTableItem>(
          data
        );
        if (this.paginator) {
          this.workoutTableSource.paginator = this.paginator;
        }
      });
  }

  ngAfterViewInit() {
    this.workoutTableSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.workoutTableSubscription.unsubscribe();
  }
}
