import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Status } from '../_model/backend.models';
import { BackendService } from '../_services/backend.service';
import { Message } from 'primeng/api';
import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  providers: [BackendService, AuthenticationService]
})
export class StatusComponent implements OnInit {
  title: string;
  currentUser: string;
  statusId: string;

  public msgs: Message[] = [];

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

  statusForm: FormGroup;

  gefuehl: number;

  readonly = true;

  constructor(private backendService: BackendService, private authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    route.params.subscribe(val => {
      // console.log('route activated: ' + JSON.stringify(val));
      this.ngOnInit();
    });

  }

  get datum() { return this.statusForm.get('datum'); }
  get schlaf() { return this.statusForm.get('schlaf'); }

  ngOnInit() {
    this.initCalendarLocale();
    this.statusId = this.route.snapshot.paramMap.get('st');

    this.route.queryParamMap.subscribe(map => {
      this.readonly = (map.get('ro') === '1') ? true : false;
      this.setTitle(this.statusId, this.readonly);

      this.statusForm = this.fb.group({
        datum: [new Date(), Validators.required],
        schlaf: new FormControl(null, [Validators.min(0), Validators.max(24)]),
        bemerkung: [null],
        gefuehlK: [3],
        gefuehlM: [3],
      });
      this.gefuehl = null;
      this.resetImages();

      this.currentUser = this.authenticationService.getUsername();

      if (this.statusId !== 'new') {
        this.backendService.getStatus(this.currentUser, +this.statusId).subscribe((res) => {
          const st: Status = res;
          // console.log(JSON.stringify(st));

          this.statusForm.setValue({
            datum: new Date(st.datum),
            schlaf: st.schlaf,
            bemerkung: st.bemerkung,
            gefuehlK: st.gefuehlK,
            gefuehlM: st.gefuehlM,
          });
          this.gefuehl = st.gefuehl;
          this.setGefuehlImages(this.gefuehl);
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
    });
  }

  public save() {
    const val = this.statusForm.value;
    // console.log('statusForm values: ' + JSON.stringify(val));
    // console.log('gefühl: ' + this.gefuehl);

    const status: Status = {
      benutzername: this.currentUser,
      datum: val.datum,
      schlaf: Math.round(10 * val.schlaf) / 10,
      bemerkung: val.bemerkung,
      gefuehl: this.gefuehl,
      gefuehlK: val.gefuehlK,
      gefuehlM: val.gefuehlM,
    };

    if (this.statusId === 'new') {
      this.backendService.addStatus(status).subscribe(
        data => {
          console.log('status successfully added: ' + JSON.stringify(data));
          this.router.navigate(['/home']);
        },
        error => {
          console.log('addStatus error: ' + JSON.stringify(error));
          this.msgs.push({
            severity: 'error', summary: 'Fehler beim Speichern des Status: ',
            detail: 'Bist du offline oder hast du fehlerhafte Daten eingegeben?'
          });
        }
      );
    } else {
      this.backendService.changeStatus(status, +this.statusId).subscribe(
        data => {
          console.log('status successfully added: ' + JSON.stringify(data));
          this.router.navigate(['/home']);
        },
        error => {
          console.log('addStatus error: ' + JSON.stringify(error));
          this.msgs.push({
            severity: 'error', summary: 'Fehler beim Speichern des Status: ',
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

  private setGefuehlImages(gefuehl: number) {
    this.resetImages();
    switch (gefuehl) {
      case null:
        break;
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

  private setTitle(id: string, readonly: boolean) {
    if (id === 'new') {
      this.title = 'Neuer Status...';
    } else if (readonly === true) {
      this.title = 'Status ansehen...';
    } else {
      this.title = 'Status ändern...';
    }
  }

  // correct problem with timezone: see https://github.com/primefaces/primeng/issues/2426
  setCorrectDate(date: Date) {
    console.log('selected date (orig): ' + date);
    const offset: number = date.getTimezoneOffset();
    console.log('timezoneOffset: ' + offset);

    date.setTime(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));

    console.log('selected date (corr): ' + date);
    //this.statusForm.controls['datum'].setValue(date);
    this.statusForm.patchValue({ datum: date });
  }
}
