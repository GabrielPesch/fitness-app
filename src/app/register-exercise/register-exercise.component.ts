import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from '../exercise-card/exercise.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Training } from '../training-details/training-card.model';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-register-exercise',
  templateUrl: './register-exercise.component.html',
  styleUrls: ['./register-exercise.component.css'],
})
export class RegisterExerciseComponent implements OnInit {
  exerciseForm: FormGroup;
  trainings: Training[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.exerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      training_id: ['', Validators.required],
      muscular_group: ['', Validators.required],
      repetitions: ['', [Validators.required, Validators.minLength(3)]],
      rest: ['', Validators.min(1)],
      image_url: ['', Validators.required],
      load: ['', Validators.min(0)],
    });
  }

  ngOnInit() {
    this.fetchTrainings();
  }

  registerExercise() {
    if (this.exerciseForm.valid) {
      const exerciseData = this.exerciseForm.value;
      const userId = JSON.parse(localStorage.getItem('user') || '{}').id;

      this.http
        .post<Exercise>(`${environment.apiBaseUrl}/exercises`, {
          training_id: 1,
          user_id: userId,
          ...exerciseData,
        })
        .subscribe({
          next: () => {
            this.openSnackBar('Exercício cadastrado', 'fechar');
            this.exerciseForm.reset();
          },
          error: (error: unknown) => {
            this.openSnackBar('Erro ao cadastrar exercício', 'fechar');
            console.error(error);
          },
        });
    }
  }

  fetchTrainings() {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (userId) {
      this.http
        .get<Training[]>(`${environment.apiBaseUrl}/trainings?user_id=${userId}`)
        .subscribe((trainings) => {
          this.trainings = trainings;
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
