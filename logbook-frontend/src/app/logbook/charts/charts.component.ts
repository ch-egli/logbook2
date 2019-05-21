import { Component, OnInit, ViewChild } from '@angular/core';
import { Message, DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/api';

import { ChartService } from './chart.service';
import { ChartMetaType } from './chart.model';
import { Observable } from 'rxjs';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  providers: [ChartService]
})
export class ChartsComponent implements OnInit {
  public aboutMessage: string;
  public messages: Array<Message> = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(77,83,96,0.3)',
          },
          ticks: {
            fontColor: 'black',
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public angleDown = 'fa fa-angle-down';
  private const chooseParam = 'Wähle...';

  public chartDataObservable: Observable<ChartMetaType>;
  public lineChartData: ChartDataSets[] = [{ data: [] }]
  public lineChartLabels: Label[] = []

  public userObservable: Observable<string[]>;
  public user = 'zoe';
  public selectedUser = this.user;
  public userOptions: SelectItem[] = [{ label: this.user, value: this.user }];

  public year = '' + (new Date()).getFullYear();
  public selectedYear = this.year;
  public yearOptions: SelectItem[] = [];

  public myChartData: Map<string, any[]>;
  public chartOptions0: SelectItem[] = [{ label: this.chooseParam, value: null }];
  public selectedChart0 = this.chooseParam;
  public chartOptions1: SelectItem[] = [{ label: this.chooseParam, value: null }];
  public selectedChart1 = this.chooseParam;

  constructor(private chartService: ChartService) {
    this.aboutMessage = 'Climbing Logbook 2';
    for (let i = 2016; i <= (new Date()).getFullYear(); i++) {
      this.yearOptions.push({ label: '' + i, value: '' + i });
    }
  }

  ngOnInit(): any {
    this.loadDataFromServer();
  }

  loadDataFromServer() {
    let me = this;
    this.userObservable = this.chartService.getAthletes();
    this.userObservable.subscribe((users) => {
      this.userOptions = []
      users.forEach((user) => {
        this.userOptions.push({ label: user, value: user });
      });
    });

    this.chartDataObservable = this.chartService.getChartsData(this.user, this.year);
    this.chartDataObservable.subscribe((res) => {
      me.myChartData = res.chartData;
      console.log(res.chartData);

      const set1 = <ChartDataSets>{
        data: res.chartData[this.selectedChart0],
        label: this.selectedChart0 !== this.chooseParam ? this.selectedChart0.substring(3) : this.chooseParam,
        yAxisID: 'y-axis-0'
      }
      const set2 = <ChartDataSets>{
        data: res.chartData[this.selectedChart1],
        label: this.selectedChart1 !== this.chooseParam ? this.selectedChart1.substring(3) : this.chooseParam,
        yAxisID: 'y-axis-1'
      }

      let optionValues: string[] = Array.from(Object.keys(res.chartData));
      optionValues.sort();
      console.log('optionValues: ' + optionValues);
      optionValues.forEach((optVal) => {
        this.chartOptions0.push({ label: optVal.substring(3), value: optVal });
      });
      console.log(this.chartOptions0);
      optionValues.forEach((optVal) => {
        this.chartOptions1.push({ label: optVal.substring(3), value: optVal });
      });

      this.lineChartData = [];
      this.lineChartData.push(set1);
      this.lineChartData.push(set2);
      this.lineChartLabels = res.labels;

      this.chart.update();
    });
  }

  createMessages() {
    this.messages.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    this.messages.push({ severity: 'warn', summary: 'Warn Message', detail: 'Sample warning' });
    this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Sample error' });
  }

  // events
  public onSelectChart0(event) {
    console.log('chart1 selected:' + event.value);
    if (event.value === null) {
      this.chart.hideDataset(0, true);
    } else {
      this.lineChartLegend = true;
      this.chart.hideDataset(0, false);
      const dataSet = <ChartDataSets>{
        data: this.myChartData[event.value],
        label: event.value.substring(3),
        yAxisID: 'y-axis-0',
        borderColor: 'grey',
        backgroundColor: `rgba(77,83,96,0.2)`,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
      this.lineChartData[0] = dataSet;
    }
  }

  public onSelectChart1(event) {
    console.log('chart2 selected: ' + event.value);
    if (event.value === null) {
      this.chart.hideDataset(1, true);
    } else {
      this.lineChartLegend = true;
      this.chart.hideDataset(1, false);
      const dataSet = <ChartDataSets>{
        data: this.myChartData[event.value],
        label: event.value.substring(3),
        yAxisID: 'y-axis-1',
        borderColor: 'red',
        backgroundColor: `rgba(255,0,0,0.3)`,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
      this.lineChartData[1] = dataSet;
    }
  }

  onSelectUser(event) {
    console.log('selected user: ' + event.value);
    this.user = event.value;
    this.loadDataFromServer();
  }

  public onSelectYear(event) {
    console.log('selected year: ' + event.value);
    this.year = event.value;
    this.loadDataFromServer();
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
