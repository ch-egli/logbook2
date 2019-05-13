import { Component, OnInit } from '@angular/core';
import { Workout} from '../workouts/workout.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title: string;
  welcomeMessage: string;

  workouts: Array<Workout> = new Array();

  constructor() {
    this.title = 'Climbing Logbook 2';
    this.welcomeMessage = 'Herzlich Willkommen';
  }

  ngOnInit() {
    let wo1: Workout = new Workout();
    wo1.datum = '13.05.19';
    wo1.benutzer = 'zoe';
    wo1.dauer = 180;
    wo1.ort = 'Wilderswil';

    let wo2: Workout = new Workout();
    wo2.datum = '12.05.19';
    wo2.benutzer = 'liv';
    wo2.dauer = 150;
    wo2.ort = 'Griffbar';

    this.workouts.push(wo1);
    this.workouts.push(wo2);
  }
}
