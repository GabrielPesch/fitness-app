import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {
  progressRecords = [
    { exercise: 'Agachamento', weight: 80, reps: '4x12' },
    { exercise: 'Supino', weight: 70, reps: '12-10-8-6' },
    { exercise: 'Barra Fixa', weight: 0, reps: '3x12' },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
