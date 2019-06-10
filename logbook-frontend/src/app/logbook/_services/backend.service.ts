import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Workout, WorkoutPageable } from '../_model/backend.models';

@Injectable()
export class BackendService {
    readonly ENDPOINT_URL_BASE = 'http://192.168.1.121:8080/v1/';

    constructor(private http: HttpClient, private router: Router) {
    }

    getAthletes(): Observable<string[]> {
        console.log('getAthletes...');
        return this.http.get<string[]>(this.ENDPOINT_URL_BASE + 'athletes');
    }

    getWorkoutsByUser(username: string): Observable<Workout[]> {
        return this.http.get<Workout[]>(this.ENDPOINT_URL_BASE + 'users/' + username + '/workouts/top/' + 8);
    }

    getPagedWorkouts(username: string, page: number, pageSize: number): Observable<WorkoutPageable> {
        return this.http.get<WorkoutPageable>(this.ENDPOINT_URL_BASE + 'users/' + username
            + '/workouts?page=' + page + '&size=' + pageSize);
    }

    addWorkout(workout: Workout) {
        return this.http.post<Workout>(this.ENDPOINT_URL_BASE + 'users/' + workout.benutzername + '/workouts', workout)
            .pipe(
                catchError(err => {
                    console.log(err.message);
                    // this.goToLoginPage();
                    return of('error in addWorkout: ' + err.message);
                })
            );
    }

    goToLoginPage() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}
