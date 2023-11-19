import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environment/environment';

interface IregisterResponse {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
          Validators.minLength(5),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(6),
        ],
      ],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      const userData = {
        email: this.formControls['email'].value,
        password: this.formControls['password'].value,
        name: this.formControls['name'].value,
      };

      this.http
        .post<IregisterResponse>(`${environment.apiBaseUrl}/users`, userData)
        .subscribe({
          next: (response) => {
            const { password, ...restOfUser } = response;
            localStorage.setItem('user', JSON.stringify(restOfUser));
            this.router.navigate(['home']);
          },
          error: (error) => {
            console.error('Erro ao registrar', error);
          },
        });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  get f() {
    return this.registerForm.controls;
  }
}
