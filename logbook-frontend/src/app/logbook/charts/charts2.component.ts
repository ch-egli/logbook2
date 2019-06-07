import { Component, OnInit } from '@angular/core';
import { Message, DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/api';

import { ChartService } from '../_services/chart.service';
import { BackendService } from '../_services/backend.service';
import { BarChartData } from '../_model/chart.model';
import { Observable, forkJoin } from 'rxjs';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './charts2.component.html',
  providers: [ChartService, BackendService, AuthenticationService]
})
export class Charts2Component implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels1: Label[] = [];
  public barChartLabels2: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData1: ChartDataSets[] = [{ data: [] }];
  public barChartData2: ChartDataSets[] = [{ data: [] }];

  public aboutMessage: string;
  public messages: Array<Message> = [];

  public angleDown = 'fa fa-angle-down';

  public chartDataObservable: Observable<Map<string, BarChartData>>;

  public userObservable: Observable<string[]>;
  public user;
  public userOptions: SelectItem[] = [{ label: '', value: '' }];

  public year = '' + (new Date()).getFullYear();
  public numericYear = (new Date()).getFullYear() % 100;
  public yearOptions: SelectItem[] = [];

  constructor(private chartService: ChartService, private backendService: BackendService,
    private authenticationService: AuthenticationService) {
    this.aboutMessage = 'Climbing Logbook 2';
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

      this.loadDataFromServer();
    });
  }

  loadDataFromServer() {
    this.chartDataObservable = this.chartService.getBarChartData(this.user, this.year);
    this.chartDataObservable.subscribe((barChartData) => {
      this.assembleBarChartData(barChartData);
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

  private assembleBarChartData(barChartData) {
    console.log(barChartData);
    this.barChartData1 = [
      {
        data: barChartData['disziplinen'].data,
        label: 'Disziplinen',
        backgroundColor: 'rgba(255,0,0,0.3)', borderColor: 'red', borderWidth: 1
      }
    ];
    this.barChartLabels1 = barChartData['disziplinen'].labels;
    this.barChartData2 = [
      {
        data: barChartData['trainingsorte'].data,
        label: 'Trainingsorte',
        backgroundColor: 'rgba(77,83,96,0.2)', borderColor: 'rgba(77,83,96,1)', borderWidth: 1
      }
    ];
    this.barChartLabels2 = barChartData['trainingsorte'].labels;
  }

  public onSelectUser(event) {
    console.log('selected user: ' + event.value);
    this.user = event.value;
    this.loadDataFromServer();
  }

  public onSelectYear(event) {
    console.log('selected year: ' + event.value);
    this.year = event.value;
    this.numericYear = (+event.value) % 100;
    this.loadDataFromServer();
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
