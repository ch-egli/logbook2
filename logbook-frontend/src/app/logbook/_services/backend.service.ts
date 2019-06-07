import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout, WorkoutPageable } from '../_model/backend.models';

@Injectable()
export class BackendService {
    readonly ENDPOINT_URL_BASE = 'http://192.168.1.121:8080/v1/';

    constructor(private http: HttpClient) {
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
}
