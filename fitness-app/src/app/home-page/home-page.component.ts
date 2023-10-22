// home-page.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  pageTitle: string = 'Minhas séries';
  pageSubtitle: string = 'O corpo conquista aquilo que a mente acredita';
  cards = [
      { 
        image: 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg', 
        title: 'Treino 1',
        repetitions: "4x12"
      },
      { 
        image: 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg', 
        title: 'Treino 2',
        repetitions: "4x12"
      },
    { 
      image: 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg', 
      title: 'Treino 3',
      repetitions: "4x12"
    },
    { 
      image: 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg', 
      title: 'Treino 4',
      repetitions: "4x12"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
