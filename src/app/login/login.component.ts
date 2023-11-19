import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface IUserResponse {
  name: string,
  email: string,
  password: string, 
  id: number
}
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
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService
    .login(this.email, this.password)
    .subscribe({
      next: (user: IUserResponse[]) => {
        if (user.length) {
          const {password, ...restOfUser} = user[0]
          localStorage.setItem('user', JSON.stringify(restOfUser))
          this.router.navigate(['home']);
        } else {
          this.openSnackBar('Credenciais inválidas', 'Fechar');
        }
      },
      error: (error: unknown) => {
        console.error(error)
        this.openSnackBar('Erro no login', 'Fechar');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
