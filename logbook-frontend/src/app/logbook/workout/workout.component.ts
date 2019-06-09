import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';

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

  deCH: any;

  workoutForm: FormGroup;
  datum = new Date();
  location: string;
  locationOptions: SelectItem[] = [];
  lead = false;
  boulder = false;
  kraft = false;
  stretching = false;
  mentaltraining = false;
  belastung = 14;
  belastungOptions: SelectItem[] = [
    { label: '20', value: 20 },
    { label: '19', value: 19 },
    { label: '18', value: 18 },
    { label: '17', value: 17 },
    { label: '16', value: 16 },
    { label: '15', value: 15 },
    { label: '14', value: 14 },
    { label: '13', value: 13 },
    { label: '12', value: 12 },
    { label: '11', value: 11 },
    { label: '10', value: 10 },
    { label: '9', value: 9 },
    { label: '8', value: 8 },
    { label: '7', value: 7 },
    { label: '6', value: 6 },
  ];
  sonstiges: string;
  sonstigesOptions: SelectItem[] = [
    { label: 'Jogging', value: 'Jogging' },
    { label: 'Velo/Bike', value: 'Velo/Bike' },
    { label: 'Ski/Snowboard', value: 'Ski/Snowboard' },
    { label: 'Langlauf', value: 'Langlauf' },
  ]

  constructor(private backendService: BackendService, private authenticationService: AuthenticationService,
    private route: ActivatedRoute, private fb: FormBuilder) {

    environment.workoutLocations.forEach((location) => {
      this.locationOptions.push({ label: location, value: location });
    });
  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('wo');
    this.initCalendarLocale();

    this.workoutForm = this.fb.group({
      datum: new FormControl(),
      location: new FormControl(),
      lead: new FormControl(),
      boulder: new FormControl(),
      kraft: new FormControl(),
      stretching: new FormControl(),
      mentaltraining: new FormControl(),
      trainingszeit: [null, Validators.required],
      belastung: new FormControl(),
      zuege12: [null, Validators.required],
      zuege23: [null, Validators.required],
      zuege34: [null, Validators.required],
      wettkampf: [null, Validators.required],
      sonstiges: new FormControl(),
    });
  }

  public save() {
    const val = this.workoutForm.value;
    console.log('datum: ' + val.datum);
    console.log('ort: ' + val.location);
    console.log('lead: ' + val.lead);
    console.log('boulder: ' + val.boulder);
    console.log('kraft: ' + val.kraft);
    console.log('stretching: ' + val.stretching);
    console.log('mentaltraining: ' + val.mentaltraining);
    console.log('trainingszeit: ' + val.trainingszeit);
    console.log('belastung: ' + val.belastung);
    console.log('zuege12: ' + val.zuege12);
    console.log('zuege23: ' + val.zuege23);
    console.log('zuege34: ' + val.zuege34);
    console.log('wettkampf: ' + val.wettkampf);
    console.log('sonstiges: ' + val.sonstiges);
  }

  private initCalendarLocale() {
    this.deCH = {
      firstDayOfWeek: 1,
      dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      dayNamesShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
      dayNamesMin: ['S', 'M', 'D', 'M ', 'D', 'F ', 'S'],
      monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      monthNamesShort: ['Jan', 'Feb', 'MÃ¤r', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      today: 'Heute',
      clear: 'Löschen',
      dateFormat: 'dd.mm.yy',
      weekHeader: 'Wo',
    };
  }

}
