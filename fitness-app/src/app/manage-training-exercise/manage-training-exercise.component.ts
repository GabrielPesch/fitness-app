import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../training-details/training-card.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Exercise } from '../exercise-card/exercise.model';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-manage-training-exercise',
  templateUrl: './manage-training-exercise.component.html',
  styleUrls: ['./manage-training-exercise.component.css'],
})
export class ManageTrainingExerciseComponent implements OnInit {
  trainings: Training[] = [];
  exercises: Exercise[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadTrainings();
    this.loadExercises();
  }

  loadTrainings() {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    this.http
      .get<Training[]>(`${environment.apiBaseUrl}/trainings?user_id=${userId}`)
      .subscribe((trainings) => {
        this.trainings = trainings;
      });
  }

  loadExercises() {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    this.http
      .get<Exercise[]>(`${environment.apiBaseUrl}/exercises?user_id=${userId}`)
      .subscribe((exercise) => {
        this.exercises = exercise;
      });
  }

  removeTraining(trainingId: number) {
    this.http.delete(`${environment.apiBaseUrl}/trainings/${trainingId}`).subscribe({
      next: () => {
        this.openSnackBar('Treinamento removido', 'fechar');
        const exercisesId = this.exercises.filter((exercise) => exercise.training_id === trainingId)
        exercisesId.forEach((exercise) => this.removeExercise(exercise.id))
        this.loadTrainings();
        this.loadExercises();
      },
      error: () => this.openSnackBar('Erro ao remover treinamento', 'fechar'),
    });
  }

  removeExercise(exerciseId: number) {
    this.http.delete(`${environment.apiBaseUrl}/exercises/${exerciseId}`).subscribe({
      next: () => {
        this.openSnackBar('Exercício removido', 'fechar');
        this.loadExercises();
      },
      error: () => this.openSnackBar('Erro ao remover exercício', 'fechar'),
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
