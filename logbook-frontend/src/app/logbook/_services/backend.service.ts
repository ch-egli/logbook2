import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Workout, Status, WorkoutPageable, StatusPageable } from '../_model/backend.models';

@Injectable()
export class BackendService {
    readonly ENDPOINT_URL_BASE = 'http://192.168.1.121:8080/v1/';

    msgs: Message[] = [];

    constructor(private http: HttpClient, private router: Router) {
    }

    getAthletes(): Observable<string[]> {
        console.log('getAthletes...');
        return this.http.get<string[]>(this.ENDPOINT_URL_BASE + 'athletes');
    }

    getPagedWorkouts(username: string, page: number, pageSize: number): Observable<WorkoutPageable> {
        return this.http.get<WorkoutPageable>(this.ENDPOINT_URL_BASE + 'users/' + username
            + '/workouts?page=' + page + '&size=' + pageSize);
    }

    getPagedStati(username: string, page: number, pageSize: number): Observable<StatusPageable> {
        return this.http.get<StatusPageable>(this.ENDPOINT_URL_BASE + 'users/' + username
            + '/status?page=' + page + '&size=' + pageSize);
    }

    getWorkout(username: string, id: number): Observable<Workout> {
        return this.http.get<Workout>(this.ENDPOINT_URL_BASE + 'users/all/workouts/' + id);
    }

    addWorkout(workout: Workout) {
        return this.http.post<Workout>(this.ENDPOINT_URL_BASE + 'users/' + workout.benutzername + '/workouts', workout);
    }

    changeWorkout(workout: Workout, workoutId: number) {
        return this.http.put<Workout>(this.ENDPOINT_URL_BASE + 'users/' + workout.benutzername + '/workouts/' + workoutId, workout);
    }

    deleteWorkout(user: string, workoutId: number) {
        return this.http.delete(this.ENDPOINT_URL_BASE + 'users/' + user + '/workouts/' + workoutId);
    }

    getStatus(username: string, id: number): Observable<Status> {
        return this.http.get<Status>(this.ENDPOINT_URL_BASE + 'users/all/status/' + id);
    }

    addStatus(status: Status) {
        return this.http.post<Status>(this.ENDPOINT_URL_BASE + 'users/' + status.benutzername + '/status', status);
    }

    changeStatus(status: Status, statusId: number) {
        return this.http.put<Status>(this.ENDPOINT_URL_BASE + 'users/' + status.benutzername + '/status/' + statusId, status);
    }

    deleteStatus(user: string, statusId: number) {
        return this.http.delete(this.ENDPOINT_URL_BASE + 'users/' + user + '/status/' + statusId);
    }

    downloadFile(user: string, year: string) {
        return this.http.get(this.ENDPOINT_URL_BASE + 'users/' + user + '/excelresults/' + year, { responseType: 'blob' as 'json' });
    }
}
