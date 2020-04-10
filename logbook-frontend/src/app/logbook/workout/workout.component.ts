import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';

import { Workout, Status } from '../_model/backend.models';
import { BackendService } from '../_services/backend.service';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

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

  msgs: Message[] = [];

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

  locationOptions: SelectItem[] = [];

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

  sonstigesOptions: SelectItem[] = [
    { label: 'Jogging', value: 'Jogging' },
    { label: 'Velo/Bike', value: 'Velo/Bike' },
    { label: 'Ski/Snowboard', value: 'Ski/Snowboard' },
    { label: 'Langlauf', value: 'Langlauf' },
    { label: 'Physio', value: 'Physio' },
  ]

  gefuehl: number;

  readonly = true;

  statusArray: any[];

  constructor(private backendService: BackendService, private authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    environment.workoutLocations.forEach((location) => {
      this.locationOptions.push({ label: location, value: location });
    });
    route.params.subscribe(val => {
      // console.log('route activated: ' + JSON.stringify(val));
      this.ngOnInit();
    });

  }

  get datum() { return this.workoutForm.get('datum'); }
  get location() { return this.workoutForm.get('location'); }
  get trainingszeit() { return this.workoutForm.get('trainingszeit'); }
  get zuege12() { return this.workoutForm.get('zuege12'); }
  get zuege23() { return this.workoutForm.get('zuege23'); }
  get zuege34() { return this.workoutForm.get('zuege34'); }
  get schlaf() { return this.workoutForm.get('schlaf'); }

  ngOnInit() {
    this.initCalendarLocale();
    this.workoutId = this.route.snapshot.paramMap.get('wo');

    this.route.queryParamMap.subscribe(map => {
      this.readonly = (map.get('ro') === '1') ? true : false;
      this.setTitle(this.workoutId, this.readonly);

      this.workoutForm = this.fb.group({
        // initial values do not work, therefore they are initialized as variables...
        datum: [new Date(), Validators.required],
        location: ['', Validators.required],
        lead: [false],
        boulder: [false],
        speed: [false],
        kraft: [false],
        stretching: [false],
        campus: [false],
        mentaltraining: [false],
        trainingszeit: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(600)]),
        belastung: [14],
        zuege12: [null, Validators.min(0)],
        zuege23: [null, Validators.min(0)],
        zuege34: [null, Validators.min(0)],
        wettkampf: [null],
        sonstiges: [null],
        schlaf: new FormControl(null, [Validators.min(0), Validators.max(24)]),
        gefuehlK: [3],
        gefuehlM: [3],
      });
      this.gefuehl = null;
      this.resetImages();

      this.currentUser = this.authenticationService.getUsername();

      if (this.workoutId !== 'new') {
        this.backendService.getWorkout(this.currentUser, +this.workoutId).subscribe((res) => {
          const wo: Workout = res;
          console.log(JSON.stringify(wo));

          this.workoutForm.setValue({
            datum: new Date(wo.datum),
            location: wo.ort,
            lead: wo.lead === 1 ? true : false,
            boulder: wo.bouldern === 1 ? true : false,
            speed: wo.speed === 1 ? true : false,
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
            gefuehlK: wo.gefuehlK,
            gefuehlM: wo.gefuehlM,
          });
          this.gefuehl = wo.gefuehl;
        },
          error => {
            console.log('getWorkout error: ' + JSON.stringify(error));
            this.msgs.push({
              severity: 'error', summary: 'Fehler beim Laden der Trainingseinheit: ',
              detail: 'Bist du offline?'
            });
          }
        );
      } else {
        // is new...
        this.getAndSetStatusForDate(new Date());
      }
    });
  }

  private getAndSetStatusForDate(date: Date) {
    this.backendService.getStati(this.currentUser, 100).subscribe((res) => {
      const result: { content: any[] } = res;
      this.statusArray = result.content;
      // console.log(JSON.stringify(result.content));
      const status: any[] = this.statusArray.filter(st => this.isEqualDate(st['datum'], date));
      console.log(JSON.stringify(status));
      if (status.length > 0) {
        const s = status[0];
        this.workoutForm.patchValue({
          schlaf: s['schlaf'],
          gefuehlK: s['gefuehlK'],
          gefuehlM: s['gefuehlM'],
        });
      } else {
        this.workoutForm.patchValue({
          schlaf: null,
          gefuehlK: 3,
          gefuehlM: 3,
        });
      }
    },
      error => {
        console.log('getStatus error: ' + JSON.stringify(error));
        this.msgs.push({
          severity: 'error', summary: 'Fehler beim Laden des Status: ',
          detail: 'Bist du offline?'
        });
      }
    );
  }

  private isEqualDate(d1: string, d2: Date): boolean {
    let result = false;
    if (d1.substr(0, 4) === d2.getUTCFullYear().toString() &&
      Number(d1.substr(5, 2)) === d2.getUTCMonth() + 1 &&
      Number(d1.substr(8, 2)) === d2.getUTCDate()) {
      result = true;
    }
    return result;
  }

  public save() {
    const val = this.workoutForm.value;
    // console.log('workoutForm values: ' + JSON.stringify(val));
    // console.log('gefühl: ' + this.gefuehl);

    const workout: Workout = {
      benutzername: this.currentUser,
      datum: val.datum,
      ort: val.location,
      trainingszeit: Math.round(val.trainingszeit),
      lead: val.lead === true ? 1 : 0,
      bouldern: val.boulder === true ? 1 : 0,
      speed: val.speed === true ? 1 : 0,
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
      schlaf: Math.round(10 * val.schlaf) / 10,
      gefuehl: this.gefuehl,
      gefuehlK: val.gefuehlK,
      gefuehlM: val.gefuehlM,
    };

    const status: Status = {
      benutzername: this.currentUser,
      datum: val.datum,
      schlaf: Math.round(10 * val.schlaf) / 10,
      bemerkung: null,
      gefuehl: this.gefuehl,
      gefuehlK: val.gefuehlK,
      gefuehlM: val.gefuehlM,
    };

    if (this.workoutId === 'new') {
      this.backendService.addWorkout(workout).subscribe(
        data1 => {
          console.log('workout successfully added: ' + JSON.stringify(data1));
          this.backendService.addStatus(status).subscribe(
            data2 => {
              console.log('status successfully added: ' + JSON.stringify(data2));
              this.router.navigate(['/home']);
            },
            error2 => {
              console.log('addStatus error: ' + JSON.stringify(error2));
              this.msgs.push({
                severity: 'error', summary: 'Fehler beim Speichern des Status: ',
                detail: 'Bist du offline oder hast du fehlerhafte Daten eingegeben?'
              });
            }
          );
        },
        error1 => {
          console.log('addWorkout error: ' + JSON.stringify(error1));
          this.msgs.push({
            severity: 'error', summary: 'Fehler beim Speichern der Trainingseinheit: ',
            detail: 'Bist du offline oder hast du fehlerhafte Daten eingegeben?'
          });

        }
      );
    } else {
      this.backendService.changeWorkout(workout, +this.workoutId).subscribe(
        data => {
          console.log('workout successfully changed: ' + JSON.stringify(data));
          this.router.navigate(['/home']);
        },
        error => {
          console.log('changeWorkout error: ' + error);
          this.msgs.push({
            severity: 'error', summary: 'Fehler beim Speichern der Trainingseinheit: ',
            detail: 'Bist du offline oder hast du fehlerhafte Daten eingegeben?'
          });
        }
      );
    }
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

  private setTitle(id: string, readonly: boolean) {
    if (id === 'new') {
      this.title = 'Neue Trainingseinheit...';
    } else if (readonly === true) {
      this.title = 'Trainingseinheit ansehen...';
    } else {
      this.title = 'Trainingseinheit ändern...';
    }
  }

  public isNew() {
    return this.workoutId === 'new';
  }

  // correct problem with timezone: see https://github.com/primefaces/primeng/issues/2426
  public setCorrectDate(date: Date) {
    console.log('selected date (orig): ' + date);
    const offset: number = date.getTimezoneOffset();
    console.log('timezoneOffset: ' + offset);

    date.setTime(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));

    console.log('selected date (corr): ' + date);
    //this.workoutForm.controls['datum'].setValue(date);
    this.workoutForm.patchValue({ datum: date });

    this.getAndSetStatusForDate(date);
  }
}
