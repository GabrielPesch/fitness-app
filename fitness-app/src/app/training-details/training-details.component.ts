import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../exercise-card/exercise.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Training } from './training-card.model';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css'],
})
export class TrainingDetailsComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const trainingId = +params['id'];
      this.loadExercises(trainingId);
    });
  }

  loadExercises(trainingId: number): void {
    this.http
      .get<Exercise[]>(
        `http://localhost:3000/exercises?training_id=${trainingId}`
      )
      .subscribe((exercises) => {
        this.exercises = exercises;
      });
  }

  finishTraining(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http
        .get<Training>(`http://localhost:3000/trainings/${id}`)
        .subscribe((trainingPayload) => {
          this.http
            .patch(`http://localhost:3000/trainings/${trainingPayload.id}`, {
              finished_times: trainingPayload.finished_times + 1,
            })
            .subscribe({
              next: () => {
                this.openSnackBar('Parabéns: Treino Concluído', 'Fechar');
              },
              error: (error: unknown) => {
                console.error(error);
                this.openSnackBar('Erro ao encerrar o treino', 'fechar');
              },
            });
        });

        this.router.navigate(['home']);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
