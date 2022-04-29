import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { SelectItem } from 'primeng/api';

import { BackendService } from '../_services/backend.service';
import { Observable, forkJoin } from 'rxjs';

import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  providers: [BackendService, AuthenticationService]
})
export class ExportComponent implements OnInit {
  public msgs: Message[] = [];

  public userObservable: Observable<string[]>;
  public user;
  public userOptions: SelectItem[] = [{ label: '', value: '' }];

  public year = '' + (new Date()).getFullYear();
  public numericYear = (new Date()).getFullYear() % 100;
  public yearOptions: SelectItem[] = [];

  constructor(private backendService: BackendService, private router: Router,
    private authenticationService: AuthenticationService) {
    for (let i = (new Date()).getFullYear(); i >= 2016; i--) {
      this.yearOptions.push({ label: '' + i, value: '' + i });
    }
  }

  ngOnInit(): any {
    this.user = this.authenticationService.getUsername();

    this.userObservable = this.backendService.getAthletes();
    this.userObservable.subscribe((users) => {
      this.assembleUserOptions(users);

      if (this.authenticationService.isTrainer()) {
        this.user = users[0];
      }
    });
  }

  private assembleUserOptions(users) {
    this.userOptions = [];
    if (this.authenticationService.isTrainer()) {
      users.forEach((user) => {
        this.userOptions.push({ label: user, value: user });
      });
    } else {
      this.userOptions.push({ label: this.user, value: this.user });
    }
  }

  public onSelectUser(event) {
    console.log('selected user: ' + event.value);
    this.user = event.value;
  }

  public onSelectYear(event) {
    console.log('selected year: ' + event.value);
    this.year = event.value;
    this.numericYear = (+event.value) % 100;
  }

  public export() {
    console.log('export Excel for ' + this.user + ' ' + this.year + '...');
    this.backendService.downloadFile(this.user, this.year).subscribe(
      (response: any) => {
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        const filename = 'workouts-' + this.year + '-' + this.user + '.xlsx';
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      error => {
        console.log('error downloading excel file: ' + JSON.stringify(error));
        this.msgs.push({
          severity: 'error', summary: 'Fehler beim Download der Excel Datei: ',
          detail: 'Bist du offline?'
        });
      }
    );
  }

  public cancel() {
    this.router.navigate(['/home']);
  }
}
