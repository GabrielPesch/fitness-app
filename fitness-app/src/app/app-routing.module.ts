import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterExerciseComponent } from './register-exercise/register-exercise.component';
import { RegisterTrainingComponent } from './register-training/register-training.component';
import { ManageTrainingExerciseComponent } from './manage-training-exercise/manage-training-exercise.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'series/:id', component: TrainingDetailsComponent },
  { path: 'register-exercise', component: RegisterExerciseComponent },
  { path: 'register-training', component: RegisterTrainingComponent },
  { path: 'manage', component: ManageTrainingExerciseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
