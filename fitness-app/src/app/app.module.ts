import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomePageComponent } from './home-page/home-page.component';
import { MatCardModule } from '@angular/material/card';
import { TrainingCardComponent } from './training-card/training-card.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ExerciseCardComponent } from './exercise-card/exercise-card.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegisterExerciseComponent } from './register-exercise/register-exercise.component';
import { MatSelectModule } from '@angular/material/select';
import { RegisterTrainingComponent } from './register-training/register-training.component';
import { ManageTrainingExerciseComponent } from './manage-training-exercise/manage-training-exercise.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    TrainingCardComponent,
    TrainingDetailsComponent,
    LoginComponent,
    RegisterComponent,
    ExerciseCardComponent,
    RegisterExerciseComponent,
    RegisterTrainingComponent,
    ManageTrainingExerciseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
