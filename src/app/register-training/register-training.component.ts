import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Training } from '../training-details/training-card.model';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-register-training',
  templateUrl: './register-training.component.html',
  styleUrls: ['./register-training.component.css'],
})


export class RegisterTrainingComponent  {
  trainingForm: FormGroup;
  trainings: Training[] = []; 

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.trainingForm = this.formBuilder.group({
      title: ['', Validators.required],
      image_url: ['', Validators.required]
    });
  }

  registerTraining() {
    if (this.trainingForm.valid) {
      const trainingData = this.trainingForm.value;
      const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
      this.http
        .post<Training>(`${environment.apiBaseUrl}/trainings`, {user_id: userId, ...trainingData, finished_times: 0})
        .subscribe({
          next: () => this.openSnackBar('Treinamento cadastrado', 'fechar'),
          error: () => this.openSnackBar('Erro ao cadastrar treinamento', 'fechar')
        });
    }
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 1000 });
  }


}
