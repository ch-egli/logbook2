import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  workoutId: string;

  deCH: any;

  imgGrinningGrey = 'assets/images/grinning-g.png';
  imgGrinningColor = 'assets/images/grinning.png';
  imgGrinning = this.imgGrinningGrey;
  imgSmirkingGrey = 'assets/images/smirking-g.png';
  imgSmirkingColor = 'assets/images/smirking.png';
  imgSmirking = this.imgSmirkingGrey;
  imgFrowningGrey = 'assets/images/frowning-g.png';
  imgFrowningColor = 'assets/images/frowning.png';
  imgFrowning = this.imgFrowningGrey;
  imgFearfulGrey = 'assets/images/fearful-g.png';
  imgFearfulColor = 'assets/images/fearful.png';
  imgFearful = this.imgFearfulGrey;

  workoutForm: FormGroup;
  datum = new Date();
  location: string;
  locationOptions: SelectItem[] = [];
  lead = false;
  boulder = false;
  kraft = false;
  stretching = false;
  campus = false;
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
  gefuehl: number;

  readonly = true;

  constructor(private backendService: BackendService, private authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    environment.workoutLocations.forEach((location) => {
      this.locationOptions.push({ label: location, value: location });
    });
  }

  ngOnInit() {
    this.initCalendarLocale();
    this.workoutId = this.route.snapshot.paramMap.get('wo');
    this.title = this.workoutId === 'new' ? 'Trainingseinheit hinzufügen...' : 'Trainingseinheit ändern...';

    this.route.queryParamMap.subscribe(map => {
      this.readonly = (map.get('ro') === '1') ? true : false;

      this.workoutForm = this.fb.group({
        // initial values do not work, therefore they are initialized as variables...
        datum: new FormControl({ value: new Date(), disabled: this.readonly }),
        location: new FormControl({ value: '', disabled: this.readonly }),
        lead: new FormControl({ value: true, disabled: this.readonly }),
        boulder: new FormControl({ value: false, disabled: this.readonly }),
        kraft: new FormControl({ value: false, disabled: this.readonly }),
        stretching: new FormControl({ value: false, disabled: this.readonly }),
        campus: new FormControl({ value: false, disabled: this.readonly }),
        mentaltraining: new FormControl({ value: false, disabled: this.readonly }),
        trainingszeit: [null, Validators.required],
        belastung: new FormControl({ value: 14, disabled: this.readonly }),
        zuege12: [null, Validators.required],
        zuege23: [null, Validators.required],
        zuege34: [null, Validators.required],
        wettkampf: [null, Validators.required],
        sonstiges: new FormControl({ value: '', disabled: this.readonly }),
        schlaf: [null, Validators.required],
      });

      this.currentUser = this.authenticationService.getUsername();

      if (this.workoutId !== 'new') {
        this.backendService.getWorkout(this.currentUser, +this.title).subscribe((res) => {
          const wo: Workout = res;
          console.log(JSON.stringify(wo));

          this.workoutForm.setValue({
            datum: new Date(wo.datum),
            location: wo.ort,
            lead: wo.lead === 1 ? true : false,
            boulder: wo.bouldern === 1 ? true : false,
            kraft: wo.kraftraum === 1 ? true : false,
            stretching: wo.dehnen === 1 ? true : false,
            campus: wo.campus === 1 ? true : false,
            mentaltraining: wo.mentaltraining === 1 ? true : false,
            trainingszeit: wo.trainingszeit,
            belastung: wo.belastung,
            zuege12: wo.zuege12,
            zuege23: wo.zuege23,
            zuege34: wo.zuege34,
            wettkampf: wo.wettkampf,
            sonstiges: wo.sonstiges,
            schlaf: wo.schlaf,
          });
          this.gefuehl = wo.gefuehl;
          this.setGefuehlImages(this.gefuehl);
        });
      }
    });
  }

  public save() {
    const val = this.workoutForm.value;
    console.log('workoutForm values: ' + JSON.stringify(val));
    console.log('gefühl: ' + this.gefuehl);

    const workout: Workout = {
      benutzername: this.currentUser,
      datum: val.datum,
      ort: val.location,
      trainingszeit: Math.round(val.trainingszeit),
      lead: val.lead === true ? 1 : 0,
      bouldern: val.boulder === true ? 1 : 0,
      kraftraum: val.kraft === true ? 1 : 0,
      dehnen: val.stretching === true ? 1 : 0,
      campus: val.campus === true ? 1 : 0,
      mentaltraining: val.mentaltraining === true ? 1 : 0,
      belastung: val.belastung,
      zuege12: Math.round(val.zuege12),
      zuege23: Math.round(val.zuege23),
      zuege34: Math.round(val.zuege34),
      wettkampf: val.wettkampf,
      sonstiges: val.sonstiges,
      schlaf: Math.round(val.schlaf),
      gefuehl: Math.round(this.gefuehl),
    };

    if (this.workoutId === 'new') {
      this.backendService.addWorkout(workout).subscribe(
        data => console.log('workout successfully added: ' + data),
        error => console.log('addWorkout error: ' + error)
      );
    } else {
      this.backendService.changeWorkout(workout, +this.workoutId).subscribe(
        data => console.log('workout successfully changed: ' + data),
        error => console.log('changeWorkout error: ' + error)
      );
    }

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }

  public cancel() {
    this.router.navigate(['/home']);
  }

  public selectGrinning() {
    if (!this.readonly) {
      this.gefuehl = 1;
      this.resetImages();
      this.imgGrinning = this.imgGrinningColor;
    }
  }

  public selectSmirking() {
    if (!this.readonly) {
      this.gefuehl = 2;
      this.resetImages();
      this.imgSmirking = this.imgSmirkingColor;
    }
  }

  public selectFrowning() {
    if (!this.readonly) {
      this.gefuehl = 3;
      this.resetImages();
      this.imgFrowning = this.imgFrowningColor;
    }
  }

  public selectFearful() {
    if (!this.readonly) {
      this.gefuehl = 4;
      this.resetImages();
      this.imgFearful = this.imgFearfulColor;
    }
  }

  private resetImages() {
    this.imgGrinning = this.imgGrinningGrey;
    this.imgSmirking = this.imgSmirkingGrey;
    this.imgFrowning = this.imgFrowningGrey;
    this.imgFearful = this.imgFearfulGrey;
  }

  private setGefuehlImages(gefuehl: number) {
    this.resetImages();
    switch (gefuehl) {
      case 1:
        this.imgGrinning = this.imgGrinningColor;
        break;
      case 2:
        this.imgSmirking = this.imgSmirkingColor;
        break;
      case 3:
        this.imgFrowning = this.imgFrowningColor;
        break;
      case 4:
        this.imgFearful = this.imgFearfulColor;
        break;
      default:
        console.log('invalid Gefuehl value: ' + gefuehl);
    }
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
