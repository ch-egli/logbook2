import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workout, Status, WorkoutPageable, StatusPageable } from '../_model/backend.models';
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
  userDiscriminatorForStatus: string;
  totalWorkouts: number;
  totalStati: number;
  workoutPageSize = 8;
  statusPageSize = 8;

  userObservable: Observable<string[]>;

  userOptions: SelectItem[] = [
    { label: null, value: null }
  ];

  workouts: Workout[];
  pagedWorkoutObservable: Observable<WorkoutPageable>;

  status: Status[];
  pagedStatusObservable: Observable<StatusPageable>;

  screenWidth: any;
  tableBenutzerWidth: any;
  tableColWidth: any;

  constructor(private backendService: BackendService, private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    this.title = 'Climbing Logbook';

    this.screenWidth = window.innerWidth;
    this.adjustTableColumnWidths();

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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.adjustTableColumnWidths();
  }

  public loadPage() {
    this.userObservable = this.backendService.getAthletes();

    this.userDiscriminator = this.getUserDiscriminator();
    this.userDiscriminatorForStatus = this.getUserDiscriminatorForStatus();
    this.pagedWorkoutObservable = this.backendService.getPagedWorkouts(this.userDiscriminator, 0, this.workoutPageSize);
    this.pagedStatusObservable = this.backendService.getPagedStati(this.userDiscriminatorForStatus, 0, this.statusPageSize);

    forkJoin(this.userObservable, this.pagedWorkoutObservable, this.pagedStatusObservable).subscribe((res) => {
      const users = res[0];
      // console.log('users: ' + users);
      if (this.userDiscriminator === 'groupEgliSisters') {
        this.userOptions.push({ label: 'liv', value: 'liv' });
        this.userOptions.push({ label: 'zoe', value: 'zoe' });
      } else {
        users.forEach((user) => {
          this.userOptions.push({ label: user, value: user });
        });
      }

      const pagedWorkouts = res[1];
      // console.log('pagedWorkouts: ' + pagedWorkouts);
      this.workouts = pagedWorkouts.content;
      this.totalWorkouts = pagedWorkouts.totalElements;

      const pagedStati = res[2];
      // console.log('pagedStati: ' + pagedStati);
      this.status = pagedStati.content;
      this.totalStati = pagedStati.totalElements;
    });
  }

  public loadWorkoutsLazy(event: LazyLoadEvent) {
    console.log('event: ' + event.first + ' ' + event.rows);
    const pageNumber = event.first / event.rows;
    this.pagedWorkoutObservable = this.backendService.getPagedWorkouts(this.userDiscriminator, pageNumber, this.workoutPageSize);
    this.pagedWorkoutObservable.subscribe((res) => {
      // console.log(res);
      this.workouts = res.content;
      this.totalWorkouts = res.totalElements;
    });
  }

  public loadStatiLazy(event: LazyLoadEvent) {
    console.log('event: ' + event.first + ' ' + event.rows);
    const pageNumber = event.first / event.rows;
    this.pagedStatusObservable = this.backendService.getPagedStati(this.userDiscriminatorForStatus, pageNumber, this.statusPageSize);
    this.pagedStatusObservable.subscribe((res) => {
      // console.log(res);
      this.status = res.content;
      this.totalStati = res.totalElements;
    });
  }

  public onUserChange(event) {
    if (event.value) {
      this.userDiscriminator = event.value;
      this.userDiscriminatorForStatus = event.value;
    } else {
      if (this.authenticationService.isEgliSister()) {
        this.userDiscriminator = 'groupEgliSisters';
      } else {
        this.userDiscriminator = 'all';
      }
      this.userDiscriminatorForStatus = 'all';
    }

    this.pagedWorkoutObservable = this.backendService.getPagedWorkouts(this.userDiscriminator, 0, this.workoutPageSize);
    this.pagedWorkoutObservable.subscribe((res) => {
      // console.log(res);
      this.workouts = res.content;
      this.totalWorkouts = res.totalElements;
    });

    this.pagedStatusObservable = this.backendService.getPagedStati(this.userDiscriminatorForStatus, 0, this.statusPageSize);
    this.pagedStatusObservable.subscribe((res) => {
      // console.log(res);
      this.status = res.content;
      this.totalStati = res.totalElements;
    });
  }

  public isTrainer() {
    return this.authenticationService.isTrainer();
  }

  public isTrainerOrEgliSister() {
    return this.authenticationService.isTrainer() || this.authenticationService.isEgliSister();
  }

  public isMyWorkout(workout) {
    // console.log('isMyWorkout: ' + (this.currentUser === workout.benutzername));
    return this.currentUser === workout.benutzername;
  }

  public isMyStatus(status) {
    // console.log('isMyStatus: ' + (this.currentUser === status.benutzername));
    return this.currentUser === status.benutzername;
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

  confirmDeletionStatus(status) {
    this.confirmationService.confirm({
      message: 'Willst du den Status wirklich löschen?',
      accept: () => {
        this.backendService.deleteStatus(this.currentUser, status.id).subscribe(
          data => console.log('status successfully deleted: ' + status.id),
          error => console.log('deleteStatus error: ' + error),
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

  private getUserDiscriminatorForStatus() {
    if (this.authenticationService.isTrainer()) {
      return 'all';
    } else {
      return this.authenticationService.getUsername();
    }
  }

  private adjustTableColumnWidths() {
    this.tableBenutzerWidth = this.screenWidth < 440 ? '62px' : null;

    if (this.screenWidth < 365) {
      this.tableColWidth = '44px';
    } else if (this.screenWidth >= 365 && this.screenWidth < 500) {
      this.tableColWidth = '56px';
    } else {
      this.tableColWidth = null;
    }
    // console.log('tableBenutzerWidth: ' + this.tableBenutzerWidth + ' tableColWidth: ' + this.tableColWidth);
  }
}
