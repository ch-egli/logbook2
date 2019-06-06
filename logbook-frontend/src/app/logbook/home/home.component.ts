import { Component, OnInit } from '@angular/core';
import { Workout } from '../workouts/workout.model';
import { Observable } from 'rxjs';
import { WorkoutService } from '../workouts/workout.service';

import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [WorkoutService, AuthenticationService]
})
export class HomeComponent implements OnInit {
  title: string;
  welcomeMessage: string;
  currentUser: string;
  currentUserCapitalized: string;

  public workoutObservable: Observable<Workout[]>;
  workouts: Workout[];

  constructor(private workoutService: WorkoutService, private authenticationService: AuthenticationService) {
    this.title = 'Climbing Logbook 2';
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUsername();
    this.currentUserCapitalized = this.currentUser.charAt(0).toUpperCase() + this.currentUser.slice(1);
    this.welcomeMessage = 'Herzlich Willkommen, ' + this.currentUserCapitalized;

    this.workoutObservable = this.workoutService.getWorkoutsByUser(this.currentUser);
    this.workoutObservable.subscribe((res) => {
      console.log(res);
      this.workouts = res;
    });
  }
}
