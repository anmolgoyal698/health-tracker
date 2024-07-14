import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddWorkoutFormComponent } from './health-tracker/components/add-workout-form/add-workout-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutTableComponent } from './health-tracker/components/workout-table/workout-table.component';
import { WorkoutFiltersComponent } from './health-tracker/components/workout-filters/workout-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddWorkoutFormComponent,
    WorkoutTableComponent,
    WorkoutFiltersComponent,
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
