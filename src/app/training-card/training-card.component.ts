import { Component, Input } from '@angular/core';
import { Training } from '../training-details/training-card.model';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent {
  @Input() cardData!: Training;

  ngOnInit() {
    if (!this.cardData.image_url) {
      this.cardData.image_url = 'https://i.ibb.co/7kxQbrZ/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma.jpg';
    }
  }
}
