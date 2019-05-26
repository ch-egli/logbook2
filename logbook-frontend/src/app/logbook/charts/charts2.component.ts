import { Component, OnInit } from '@angular/core';
import { Message, DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/api';

import { ChartService } from './chart.service';
import { BarChartData } from './chart.model';
import { Observable } from 'rxjs';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './charts2.component.html',
  providers: [ChartService]
})
export class Charts2Component implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
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

  public angleDown = 'fa fa-angle-down';

  public chartDataObservable: Observable<Map<string, BarChartData>>;

  public userObservable: Observable<string[]>;
  public user = 'zoe';
  public userOptions: SelectItem[] = [{ label: this.user, value: this.user }];

  public year = '' + (new Date()).getFullYear();
  public numericYear = (new Date()).getFullYear() % 100;
  public yearOptions: SelectItem[] = [];

  constructor(private chartService: ChartService) {
    this.aboutMessage = 'Climbing Logbook 2';
    for (let i = (new Date()).getFullYear(); i >= 2016; i--) {
      this.yearOptions.push({ label: '' + i, value: '' + i });
    }
  }

  ngOnInit(): any {
    this.loadDataFromServer();
  }

  loadDataFromServer() {
    const me = this;
    this.userObservable = this.chartService.getAthletes();
    this.userObservable.subscribe((users) => {
      this.userOptions = [];
      users.forEach((user) => {
        this.userOptions.push({ label: user, value: user });
      });
    });

    this.chartDataObservable = this.chartService.getBarChartData(this.user, this.year);
    this.chartDataObservable.subscribe((res) => {
      console.log(res);
      this.barChartData1 = [
        {
          data: res['disziplinen'].data,
          label: 'Disziplinen',
          backgroundColor: 'rgba(255,0,0,0.3)', borderColor: 'red', borderWidth: 1
        }
      ];
      this.barChartLabels1 = res['disziplinen'].labels;
      this.barChartData2 = [
        {
          data: res['trainingsorte'].data,
          label: 'Trainingsorte',
          backgroundColor: 'rgba(77,83,96,0.2)', borderColor: 'rgba(77,83,96,1)', borderWidth: 1
        }
      ];
      this.barChartLabels2 = res['trainingsorte'].labels;
    });
  }

  onSelectUser(event) {
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
