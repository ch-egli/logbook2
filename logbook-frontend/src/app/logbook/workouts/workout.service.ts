import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout, WorkoutPageable } from './workout.model';

@Injectable()
export class WorkoutService {
    readonly ENDPOINT_URL_BASE = 'http://192.168.1.121:8080/v1/';

    constructor(private http: HttpClient) {
    }

    getWorkoutsByUser(username: string): Observable<Workout[]> {
        return this.http.get<Workout[]>(this.ENDPOINT_URL_BASE + 'users/' + username + '/workouts/top/' + 8);
    }

    getPagedWorkouts(username: string): Observable<WorkoutPageable> {
        return this.http.get<WorkoutPageable>(this.ENDPOINT_URL_BASE + 'users/' + username + '/workouts');
    }
}
