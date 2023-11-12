import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

interface IregisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
  token: string;
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
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      password: ['', [Validators.required, Validators.maxLength(100)]],
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

      this.http.post('http://localhost:8081/users', userData).subscribe({
        next: (response: Object) => {
          const { token } = response as IregisterResponse;
          this.authService.saveTokenToLocalStorage(token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro durante o registro:', error);
        },
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
