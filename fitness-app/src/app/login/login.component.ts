import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.saveTokenToLocalStorage(response.token)
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Erro no login', error);
        }
      }
       

      );
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
