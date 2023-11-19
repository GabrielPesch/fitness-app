import { Component, Input } from '@angular/core';
import { Exercise } from './exercise.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent {
  @Input() cardData!: Exercise;
  newLoad: number;
  editMode: boolean = false;
  isVisible: boolean = true;

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) {
    this.newLoad = this.cardData?.load || 0;
  }

  updateLoad(): void {
    this.cardData.load = this.newLoad;
    this.editMode = false;

    this.http.patch(`http://localhost:3000/exercises/${this.cardData.id}`, { load: this.newLoad })
      .subscribe({
        next: () => {
          this.openSnackBar('Carga atualizada', 'Fechar');
        },
        error: (error: unknown) => {
          console.error(error)
          this.openSnackBar('Erro ao atualizar a carga', "fechar");
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }  
}
