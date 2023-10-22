import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent {
  @Input() cardData: any;
}
