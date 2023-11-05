import { Component, Input } from '@angular/core';
import { TrainingCard } from '../training-details/training-card.model';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent {
  @Input() cardData!: TrainingCard;

  ngOnInit() {
    if (!this.cardData.image) {
      this.cardData.image = 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg';
    }
  }
}
