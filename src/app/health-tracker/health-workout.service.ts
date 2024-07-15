import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  of,
  switchMap,
} from 'rxjs';
import {
  IWorkoutItem,
  IWorkoutTableItem,
  WorkoutFilter,
  WorkoutType,
} from './health-tracker.model';
import { DEFAULT_WORKOUT_LIST } from './health-workout.constants';

@Injectable({
  providedIn: 'root',
})
export class HealthWorkoutService {
  workoutListSubject = new BehaviorSubject([] as IWorkoutItem[]);
  searchQuerySubject = new BehaviorSubject('');
  workoutFilterSubject = new BehaviorSubject('All');
  selectedUserSubject = new BehaviorSubject<string | null>(null);

  workoutList$ = this.workoutListSubject.asObservable();
  searchQuery$ = this.searchQuerySubject.asObservable();
  workoutFilter$ = this.workoutFilterSubject.asObservable();
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor() {}

  initWorkoutList() {
    const workoutList = localStorage.getItem('workoutList');
    if (workoutList) {
      this.workoutListSubject.next(JSON.parse(workoutList));
    } else {
      this.workoutListSubject.next(DEFAULT_WORKOUT_LIST);
      localStorage.setItem('workoutList', JSON.stringify(DEFAULT_WORKOUT_LIST));
    }
  }

  addWorkoutItem(name: string, type: WorkoutType, minutes: number) {
    const currentWorkoutList = this.workoutListSubject.value;
    const isUserAlreadyExists = currentWorkoutList.some(
      (workout) => workout.name.toLowerCase() === name.toLowerCase()
    );

    let newWorkoutList: IWorkoutItem[];
    if (isUserAlreadyExists) {
      newWorkoutList = currentWorkoutList.map((workout) => {
        if (workout.name.toLowerCase() === name.toLowerCase()) {
          const isTypeAlreadyExists = workout.workouts.some(
            (item) => item.type === type
          );
          let updatedWorkouts;
          if (isTypeAlreadyExists) {
            updatedWorkouts = workout.workouts.map((item) => {
              if (item.type === type) {
                return { ...item, minutes: item.minutes + minutes };
              } else {
                return item;
              }
            });
          } else {
            updatedWorkouts = [...workout.workouts, { type, minutes }];
          }
          return { ...workout, workouts: updatedWorkouts };
        } else {
          return workout;
        }
      });
    } else {
      const newWorkoutItem = {
        id: currentWorkoutList.length + 1,
        name,
        workouts: [{ type, minutes }],
      };

      newWorkoutList = [...currentWorkoutList, newWorkoutItem];
    }

    console.log('Workout list', newWorkoutList);

    this.workoutListSubject.next(newWorkoutList);
    localStorage.setItem('workoutList', JSON.stringify(newWorkoutList));
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  setWorkoutFilter(filter: WorkoutFilter) {
    this.workoutFilterSubject.next(filter);
  }

  convertWorkoutListToTableFormat(
    workoutList: IWorkoutItem[]
  ): IWorkoutTableItem[] {
    return workoutList.map((workoutItem) => {
      return {
        name: workoutItem.name,
        workouts: workoutItem.workouts.map((item) => item.type).join(', '),
        totalWorkouts: workoutItem.workouts.length,
        totalMins: workoutItem.workouts.reduce(
          (acc, cur) => acc + cur.minutes,
          0
        ),
      };
    });
  }

  getWorkoutTableObservable() {
    return combineLatest([
      this.searchQuery$,
      this.workoutFilter$,
      this.workoutList$,
    ]).pipe(
      map(([searchQuery, workoutFilter, workoutList]) => {
        console.log(searchQuery, workoutFilter, workoutList);
        const workoutListTableFormat =
          this.convertWorkoutListToTableFormat(workoutList);
        const filteredWorkoutList = workoutListTableFormat.filter(
          (workoutItem) => {
            return (
              workoutItem.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) &&
              (workoutItem.workouts
                .toLowerCase()
                .includes(workoutFilter.toLowerCase()) ||
                workoutFilter === 'All')
            );
          }
        );
        return filteredWorkoutList;
      })
    );
  }

  getWorkoutChartsData() {
    return this.selectedUser$.pipe(
      filter((name) => !!name),
      switchMap((name) => {
        if (!name) {
          return of(null);
        }
        return this.workoutList$.pipe(
          map((workoutList) => {
            const userWorkoutData = workoutList.find(
              (item) => item.name === name
            );
            if (userWorkoutData) {
              return Object.fromEntries(
                userWorkoutData.workouts.map((item) => [
                  item.type,
                  item.minutes,
                ])
              );
            }
            return [];
          })
        );
      })
    );
  }

  getWorkoutUsersList() {
    return this.workoutList$.pipe(
      map((workoutList) => {
        return workoutList.map((item) => item.name);
      })
    );
  }

  setSelectedUser(name: string) {
    this.selectedUserSubject.next(name);
  }

  getSelectedUser() {
    return this.selectedUser$;
  }
}
