import { Component, OnInit } from '@angular/core';
import { TrainingCard } from '../training-details/training-card.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  pageTitle: string = 'Minhas séries';
  pageSubtitle: string = 'O corpo conquista aquilo que a mente acredita';
  cards: TrainingCard[] = [
      { 
        id: 1,
        image: 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg', 
        title: 'Treino 1',
        repetitions: "4x12"
      },
      { 
        id: 2,
        image: 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg', 
        title: 'Treino 2',
        repetitions: "4x12"
      },
    { 
      id: 3,
      image: 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg', 
      title: 'Treino 3',
      repetitions: "4x12"
    },
    { 
      id: 4,
      image: 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg', 
      title: 'Treino 4',
      repetitions: "4x12"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
