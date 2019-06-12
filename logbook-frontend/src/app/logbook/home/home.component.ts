import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workout, WorkoutPageable } from '../_model/backend.models';
import { Observable, forkJoin } from 'rxjs';
import { BackendService } from '../_services/backend.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { SelectItem, ConfirmationService } from 'primeng/api';

import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [BackendService, AuthenticationService]
})
export class HomeComponent implements OnInit {
  title: string;
  welcomeMessage: string;
  currentUser: string;
  currentUserCapitalized: string;
  userDiscriminator: string;
  totalWorkouts: number;
  workoutPageSize = 10;

  userObservable: Observable<string[]>;

  userOptions: SelectItem[] = [
    { label: null, value: null }
  ];

  workouts: Workout[];
  pagedWorkoutObservable: Observable<WorkoutPageable>;

  constructor(private backendService: BackendService, private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    this.title = 'Climbing Logbook';
    route.params.subscribe(val => {
      // console.log('route activated: ' + JSON.stringify(val));
    });
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUsername();
    this.currentUserCapitalized = this.currentUser.charAt(0).toUpperCase() + this.currentUser.slice(1);
    this.welcomeMessage = 'Herzlich Willkommen, ' + this.currentUserCapitalized;

    this.loadPage();
  }

  public loadPage() {
    this.userObservable = this.backendService.getAthletes();

    this.userDiscriminator = this.getUserDiscriminator();
    this.pagedWorkoutObservable = this.backendService.getPagedWorkouts(this.userDiscriminator, 0, this.workoutPageSize);

    forkJoin(this.userObservable, this.pagedWorkoutObservable).subscribe((res) => {
      const users = res[0];
      console.log('users: ' + users);
      users.forEach((user) => {
        this.userOptions.push({ label: user, value: user });
      });

      const pagedWorkouts = res[1];
      console.log('pagedWorkouts: ' + pagedWorkouts);
      this.workouts = pagedWorkouts.content;
      this.totalWorkouts = pagedWorkouts.totalElements;
    });
  }

  public loadWorkoutsLazy(event: LazyLoadEvent) {
    console.log('event: ' + event.first + ' ' + event.rows);
    const pageNumber = event.first / event.rows;
    this.pagedWorkoutObservable = this.backendService.getPagedWorkouts(this.userDiscriminator, pageNumber, this.workoutPageSize);
    this.pagedWorkoutObservable.subscribe((res) => {
      console.log(res);
      this.workouts = res.content;
      this.totalWorkouts = res.totalElements;
    });
  }

  public onUserChange(event) {
    if (event.value) {
      this.userDiscriminator = event.value;
    } else {
      this.userDiscriminator = 'all';
    }

    this.pagedWorkoutObservable = this.backendService.getPagedWorkouts(this.userDiscriminator, 0, this.workoutPageSize);
    this.pagedWorkoutObservable.subscribe((res) => {
      console.log(res);
      this.workouts = res.content;
      this.totalWorkouts = res.totalElements;
    });
  }

  public isTrainer() {
    return this.authenticationService.isTrainer();
  }

  public isMyWorkout(workout) {
    // console.log('isMyWorkout: ' + (this.currentUser === workout.benutzername));
    return this.currentUser === workout.benutzername;
  }

  public askAndDelete(workout) {
    console.log('askAndDelete: ' + workout.id);
  }

  confirmDeletion(workout) {
    this.confirmationService.confirm({
      message: 'Willst du die Trainingseinheit wirklich löschen?',
      accept: () => {
        this.backendService.deleteWorkout(this.currentUser, workout.id).subscribe(
          data => console.log('workout successfully deleted: ' + workout.id),
          error => console.log('deleteWorkout error: ' + error),
          () => this.loadPage()
        );
      },
      reject: () => {
        // console.log('rejected');
      }
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
