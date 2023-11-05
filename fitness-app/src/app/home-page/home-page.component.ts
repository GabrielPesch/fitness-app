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
  cards: TrainingCard[] = [];
  formErrors: { [key: string]: string } = {
    'title': '',
    'image': ''
  };

  newTraining: TrainingCard = {
    id: 0,
    image: '',
    title: '',
    muscularGroup: 'Braços'
  };

  constructor() { }

  ngOnInit(): void {
    this.loadTrainings();
  }
  onSubmit(): void {

    if (this.validateForm()) {
      this.newTraining.id = this.generateUniqueId();
  
      if (!this.cards) {
        this.cards = [];
      }
  
      this.cards.push(this.newTraining);
      localStorage.setItem('trainingCards', JSON.stringify(this.cards));
      this.resetForm();
    }
  }

  generateUniqueId(): number {
    return Date.now();
  }

  loadTrainings(): void {
    const storedTrainings = localStorage.getItem('trainingCards');
    this.cards = storedTrainings ? JSON.parse(storedTrainings) : [];
  }

  validateForm(): boolean {
    this.formErrors['title'] = this.newTraining.title ? '' : 'O título é obrigatório.';
    this.formErrors['image'] = this.isValidUrl(this.newTraining.image)
      ? (this.isJpgUrl(this.newTraining.image) ? '' : 'A imagem deve ser no formato .jpg.')
      : 'O link da imagem é inválido ou está vazio.';

    return !Object.values(this.formErrors).some(error => error);
  }

  isValidUrl(url: string): boolean {
    const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(url);
  }

  isJpgUrl(url: string): boolean {
    const regex = /\.jpg$/i;
    return regex.test(url);
  }

  resetForm(): void {
    this.newTraining = {
      id: 0,
      image: '',
      title: '',
      muscularGroup: 'Braços'
    };
  }
}
