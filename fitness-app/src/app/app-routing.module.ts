import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'series/:id', component: TrainingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
