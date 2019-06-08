import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workout, WorkoutPageable } from '../_model/backend.models';
import { Observable, forkJoin } from 'rxjs';
import { BackendService } from '../_services/backend.service';
import { SelectItem } from 'primeng/api';

import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  providers: [BackendService, AuthenticationService]
})
export class WorkoutComponent implements OnInit {
  title: string;
  currentUser: string;

  constructor(private backendService: BackendService, private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('wo') || 'new';
  }

}
