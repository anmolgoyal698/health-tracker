export type WorkoutType = 'Running' | 'Cycling' | 'Swimming' | 'Yoga';

export type WorkoutFilter = WorkoutType | 'All';

export interface IWorkoutItem {
  id: number;
  name: string;
  workouts: IWorkout[];
}

export interface IWorkout {
  type: string;
  minutes: number;
}

export interface IWorkoutTableItem {
  name: string;
  workouts: string;
  totalWorkouts: number;
  totalMins: number;
}
