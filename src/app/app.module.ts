import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseListComponent,
    ProgressTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
