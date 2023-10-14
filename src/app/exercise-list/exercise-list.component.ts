import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  exercises = [
    { name: 'Agachamento', category: 'Pernas' },
    { name: 'Supino', category: 'Peito' },
    { name: 'Barra Fixa', category: 'Costas' },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
