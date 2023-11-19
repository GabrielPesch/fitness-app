import { Component, OnInit } from '@angular/core';
import { Training } from '../training-details/training-card.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  pageTitle: string = 'Minhas séries';
  pageSubtitle: string = 'O corpo conquista aquilo que a mente acredita';
  cards: Training[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadTrainings();
  }

  loadTrainings(): void {
    const userItem = localStorage.getItem('user');

    if (userItem) {
      const user = JSON.parse(userItem);
      if (user && user.id) {
        this.http
          .get<Training[]>(
            `http://localhost:3000/trainings?user_id=${user.id}`
          )
          .subscribe((trainings) => {
            this.cards = trainings;
          });
      } else {
        this.router.navigate(['login']);
      }
    }
  }
}
