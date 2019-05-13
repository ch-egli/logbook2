import { Component, OnInit } from '@angular/core';
import { Workout} from '../workouts/workout.model';
import { Observable } from 'rxjs';
import { WorkoutService } from '../workouts/workout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [WorkoutService]
})
export class HomeComponent implements OnInit {
  title: string;
  welcomeMessage: string;

  public workoutObservable: Observable<Workout[]>;
  workouts: Workout[];

  constructor(private workoutService: WorkoutService) {
    this.title = 'Climbing Logbook 2';
    this.welcomeMessage = 'Herzlich Willkommen';
  }

  ngOnInit() {
    this.workoutObservable = this.workoutService.getWorkoutsByUser('zoe');
    this.workoutObservable.subscribe((res) => {
      console.log(res);
      this.workouts = res;
    });
  }
}
