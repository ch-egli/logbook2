import { Component, OnInit } from '@angular/core';
import { Workout, WorkoutPageable } from '../workouts/workout.model';
import { Observable } from 'rxjs';
import { WorkoutService } from '../workouts/workout.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { SelectItem } from 'primeng/api';

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
  userDiscriminator: string;
  totalWorkouts: number;
  workoutPageSize = 10;

  benutzerOptions: SelectItem[] = [
    { label: null, value: null },
    { label: 'zoe', value: 'zoe' },
    { label: 'liv', value: 'liv' },
  ];

  workouts: Workout[];
  pagedWorkoutObservable: Observable<WorkoutPageable>;

  constructor(private workoutService: WorkoutService, private authenticationService: AuthenticationService) {
    this.title = 'Climbing Logbook';
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUsername();
    this.currentUserCapitalized = this.currentUser.charAt(0).toUpperCase() + this.currentUser.slice(1);
    this.welcomeMessage = 'Herzlich Willkommen, ' + this.currentUserCapitalized;

    this.userDiscriminator = this.getUserDiscriminator();
    this.pagedWorkoutObservable = this.workoutService.getPagedWorkouts(this.userDiscriminator, 0, this.workoutPageSize);
    this.pagedWorkoutObservable.subscribe((res) => {
      console.log(res);
      this.workouts = res.content;
      this.totalWorkouts = res.totalElements;
    });
  }

  public loadWorkoutsLazy(event: LazyLoadEvent) {
    console.log('event: ' + event.first + ' ' + event.rows);
    const pageNumber = event.first / event.rows;
    this.pagedWorkoutObservable = this.workoutService.getPagedWorkouts(this.userDiscriminator, pageNumber, this.workoutPageSize);
    this.pagedWorkoutObservable.subscribe((res) => {
      console.log(res);
      this.workouts = res.content;
      this.totalWorkouts = res.totalElements;
    });
  }

  public onBenutzerChange(event) {
    if (event.value) {
      this.userDiscriminator = event.value;
    } else {
      this.userDiscriminator = 'all';
    }

    this.pagedWorkoutObservable = this.workoutService.getPagedWorkouts(this.userDiscriminator, 0, this.workoutPageSize);
    this.pagedWorkoutObservable.subscribe((res) => {
      console.log(res);
      this.workouts = res.content;
      this.totalWorkouts = res.totalElements;
    });
  }

  public isTrainer() {
    return this.authenticationService.isTrainer();
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
