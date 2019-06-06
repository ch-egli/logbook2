import { Component, OnInit } from '@angular/core';
import { Workout, WorkoutPageable } from '../workouts/workout.model';
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

  workouts: Workout[];
  pagedWorkoutObservable: Observable<WorkoutPageable>;

  constructor(private workoutService: WorkoutService, private authenticationService: AuthenticationService) {
    this.title = 'Climbing Logbook';
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUsername();
    this.currentUserCapitalized = this.currentUser.charAt(0).toUpperCase() + this.currentUser.slice(1);
    this.welcomeMessage = 'Herzlich Willkommen, ' + this.currentUserCapitalized;

    const userDiscriminator = this.getUserDiscriminator();
    this.pagedWorkoutObservable = this.workoutService.getPagedWorkouts(userDiscriminator);
    this.pagedWorkoutObservable.subscribe((res) => {
      console.log(res);
      this.workouts = res.content;
    });
  }

  private getUserDiscriminator() {
    if (this.authenticationService.isTrainer()) {
      return 'all';
    } else if (this.authenticationService.isEgliSister()) {
      return 'groupEgliSisters';
    } else {
      return this.authenticationService.getUsername();
    }
  }
}
