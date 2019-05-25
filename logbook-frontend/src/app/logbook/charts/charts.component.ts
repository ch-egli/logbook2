import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Message, DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/api';

import { ChartService } from './chart.service';
import { ChartMetaType, Wettkampf } from './chart.model';
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

  public annotations;
  public lineChartOptions: (ChartOptions & { annotation: any });

  public lineChartColors: Color[] = this.assembleLineChartColors();
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public angleDown = 'fa fa-angle-down';
  private chooseParam = 'Wähle...';

  public chartDataObservable: Observable<ChartMetaType>;
  public lineChartData: ChartDataSets[] = [{ data: [] }]
  public lineChartLabels: Label[] = []

  public userObservable: Observable<string[]>;
  public user = 'zoe';
  public selectedUser = this.user;
  public userOptions: SelectItem[] = [{ label: this.user, value: this.user }];

  public year = '' + (new Date()).getFullYear();
  public numericYear = (new Date()).getFullYear() % 100;
  public yearOptions: SelectItem[] = [];

  public myChartData: Map<string, any[]>;
  public chartOptions0: SelectItem[] = [{ label: this.chooseParam, value: null }];
  public selectedChart0 = this.chooseParam;
  public chartOptions1: SelectItem[] = [{ label: this.chooseParam, value: null }];
  public selectedChart1 = this.chooseParam;

  public wettkaempfe: Wettkampf[] = [];

  public maxZuege0 = 0;
  public maxZuege1 = 0;

  constructor(private chartService: ChartService) {
    this.aboutMessage = 'Climbing Logbook 2';
    for (let i = (new Date()).getFullYear(); i >= 2016; i--) {
      this.yearOptions.push({ label: '' + i, value: '' + i });
    }
  }

  ngOnInit(): any {
    this.annotations = this.assembleAnnotations(this.wettkaempfe);
    this.lineChartOptions = this.assembleLineChartOptions(this.annotations);

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

    this.chartDataObservable = this.chartService.getChartsData(this.user, this.year);
    this.chartDataObservable.subscribe((res) => {
      me.myChartData = res.chartData;
      // console.log(res.chartData);
      console.log(res.wettkaempfe);
      this.wettkaempfe = res.wettkaempfe;

      this.annotations = this.assembleAnnotations(this.wettkaempfe);
      this.lineChartOptions = this.assembleLineChartOptions(this.annotations);

      const set1 = <ChartDataSets>{
        data: res.chartData[this.selectedChart0],
        label: this.selectedChart0 !== this.chooseParam ? this.selectedChart0.substring(3) : this.chooseParam,
        yAxisID: 'y-axis-0'
      };
      if (this.selectedChart0.indexOf('Züge') !== -1) {
        this.maxZuege0 = Math.max(...res.chartData[this.selectedChart0]);
      } else {
        this.maxZuege0 = 0;
      }

      const set2 = <ChartDataSets>{
        data: res.chartData[this.selectedChart1],
        label: this.selectedChart1 !== this.chooseParam ? this.selectedChart1.substring(3) : this.chooseParam,
        yAxisID: 'y-axis-1'
      }
      if (this.selectedChart1.indexOf('Züge') !== -1) {
        this.maxZuege1 = Math.max(...res.chartData[this.selectedChart1]);
      } else {
        this.maxZuege1 = 0;
      }


      this.chartOptions0 = [{ label: this.chooseParam, value: null }];
      const optionValues: string[] = Array.from(Object.keys(res.chartData));
      optionValues.sort();
      console.log('optionValues: ' + optionValues);
      optionValues.forEach((optVal) => {
        this.chartOptions0.push({ label: optVal.substring(3), value: optVal });
      });
      this.chartOptions1 = [{ label: this.chooseParam, value: null }];
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
    console.log('chart0 selected:' + event.value);
    if (event.value === null) {
      this.chart.hideDataset(0, true);
      this.selectedChart0 = this.chooseParam;
    } else {
      this.selectedChart0 = event.value;
      this.lineChartLegend = true;
      this.chart.hideDataset(0, false);
      const dataSet = <ChartDataSets>{
        data: this.myChartData[event.value],
        label: event.value.substring(3),
        yAxisID: 'y-axis-0',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: `rgba(77,83,96,0.1)`,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointRadius: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
      this.lineChartData[0] = dataSet;
      if (event.value.indexOf('Züge') !== -1) {
        this.maxZuege0 = Math.max(...this.myChartData[event.value]);
      } else {
        this.maxZuege0 = 0;
      }
      //console.log('maxZuege0: ' + this.maxZuege0);
    }
  }

  public onSelectChart1(event) {
    console.log('chart1 selected: ' + event.value);
    if (event.value === null) {
      this.chart.hideDataset(1, true);
      this.selectedChart1 = this.chooseParam;
    } else {
      this.selectedChart1 = event.value;
      this.lineChartLegend = true;
      this.chart.hideDataset(1, false);
      const dataSet = <ChartDataSets>{
        data: this.myChartData[event.value],
        label: event.value.substring(3),
        yAxisID: 'y-axis-1',
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: `rgba(255,0,0,0.2)`,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointRadius: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
      this.lineChartData[1] = dataSet;
      if (event.value.indexOf('Züge') !== -1) {
        this.maxZuege1 = Math.max(...this.myChartData[event.value]);
      } else {
        this.maxZuege1 = 0;
      }
      //console.log('maxZuege1: ' + this.maxZuege1);
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
    this.numericYear = (+event.value) % 100;
    this.loadDataFromServer();
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public assembleAnnotations(wettkaempfe: Wettkampf[]) {
    let dynamicAnnotations = [];
    wettkaempfe.forEach((w) => {
      const wettkampf = {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: w.datum,
        borderColor: w.disziplin === 'lead' ? 'blue' : 'green',
        borderWidth: 1,
        label: {
          enabled: true,
          fontColor: w.disziplin === 'lead' ? 'blue' : 'green',
          fontSize: 10,
          fontStyle: 'normal',
          position: 'top',
          backgroundColor: 'white',
          yPadding: 2,
          yAdjust: -1,
          content: w.abkuerzung,
        },
        onMouseover: function (e) {
          const fontColor = w.disziplin === 'lead' ? 'blue' : 'green';
          document.getElementById('wettkampfTooltip').innerHTML = '<font color="' + fontColor + '">' + w.beschreibung + '</font>';
          setTimeout(function () {
            document.getElementById('wettkampfTooltip').innerHTML = '';
          }, 1500);
        },
        onMouseout: function (e) {
          document.getElementById('wettkampfTooltip').innerHTML = '';
        },
      };
      dynamicAnnotations.push(wettkampf);
    });

    return {
      drawTime: 'beforeDatasetsDraw',
      events: ['click', 'dblclick', 'mouseover', 'mouseout'],
      annotations: dynamicAnnotations
    };
  }

  public assembleLineChartOptions(annotations) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              min: '01.01.' + this.numericYear,
              max: '01.01.' + (this.numericYear + 1),
              displayFormats: {
                'day': 'DD.MM.YY',
                'week': 'DD.MM.YY',
                'month': 'DD.MM.YY',
              },
              parser: 'DD.MM.YY',
              stepSize: 1,
              // unit: 'week', // default is false resp. month
            },
          }
        ],
        yAxes: [
          {
            id: 'y-axis-0',
            position: 'left',
            gridLines: {
              color: 'rgba(77,83,96,0.3)',
            },
            ticks: {
              fontColor: 'black',
            },
            afterDataLimits: axis => {
              if (this.selectedChart0 && this.selectedChart0.indexOf('Belastung') !== -1) {
                axis.min = 6;
                axis.max = 20;
              } else if (this.selectedChart0 && this.selectedChart0.indexOf('Züge') !== -1) {
                axis.min = 0;
                axis.max = Math.max(this.maxZuege0, this.maxZuege1);
              } else if (this.selectedChart0 && this.selectedChart0.indexOf('Anzahl Trainings') !== -1) {
                axis.min = 0;
                axis.max = 12;
              } else if (this.selectedChart0 && this.selectedChart0.indexOf('Trainingszeit') !== -1) {
                axis.min = 0;
                axis.max = 280;
              } else if (this.selectedChart0 && this.selectedChart0.indexOf('Schlaf (Mittelwert)') !== -1) {
                axis.min = 3;
                axis.max = 13;
              } else if (this.selectedChart0 && this.selectedChart0.indexOf('Anzahl Nächte mit wenig Schlaf') !== -1) {
                axis.min = 0;
                axis.max = 4;
              } else if (this.selectedChart0 && this.selectedChart0.indexOf('Gefühl (Mittelwert') !== -1) {
                axis.min = 1;
                axis.max = 4;
              } else if (this.selectedChart0 && this.selectedChart0.indexOf('Anzahl schlechtes Gefühl') !== -1) {
                axis.min = 0;
                axis.max = 7;
              } else if (this.selectedChart0 && (this.selectedChart0.indexOf('Lead') !== -1
                || this.selectedChart0.indexOf('Bouldern') !== -1
                || this.selectedChart0.indexOf('Campusboard')
                || this.selectedChart0.indexOf('Krafttrainings')
                || this.selectedChart0.indexOf('Stretching')
                || this.selectedChart0.indexOf('Mentaltraining')
                || this.selectedChart0.indexOf('Jogging'))) {
                axis.min = 0;
                axis.max = 12;
              }
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
            },
            afterDataLimits: axis => {
              if (this.selectedChart1 && this.selectedChart1.indexOf('Belastung') !== -1) {
                axis.min = 6;
                axis.max = 20;
              } else if (this.selectedChart1 && this.selectedChart1.indexOf('Züge') !== -1) {
                axis.min = 0;
                axis.max = Math.max(this.maxZuege0, this.maxZuege1);
              } else if (this.selectedChart1 && this.selectedChart1.indexOf('Anzahl Trainings') !== -1) {
                axis.min = 0;
                axis.max = 12;
              } else if (this.selectedChart1 && this.selectedChart1.indexOf('Trainingszeit') !== -1) {
                axis.min = 0;
                axis.max = 280;
              } else if (this.selectedChart1 && this.selectedChart1.indexOf('Schlaf (Mittelwert)') !== -1) {
                axis.min = 3;
                axis.max = 13;
              } else if (this.selectedChart1 && this.selectedChart1.indexOf('Anzahl Nächte mit wenig Schlaf') !== -1) {
                axis.min = 0;
                axis.max = 4;
              } else if (this.selectedChart1 && this.selectedChart1.indexOf('Gefühl (Mittelwert') !== -1) {
                axis.min = 1;
                axis.max = 4;
              } else if (this.selectedChart1 && this.selectedChart1.indexOf('Anzahl schlechtes Gefühl') !== -1) {
                axis.min = 0;
                axis.max = 7;
              } else if (this.selectedChart1 && (this.selectedChart1.indexOf('Lead') !== -1
                || this.selectedChart1.indexOf('Bouldern') !== -1
                || this.selectedChart1.indexOf('Campusboard')
                || this.selectedChart1.indexOf('Krafttrainings')
                || this.selectedChart1.indexOf('Stretching')
                || this.selectedChart1.indexOf('Mentaltraining')
                || this.selectedChart1.indexOf('Jogging'))) {
                axis.min = 0;
                axis.max = 12;
              }
            }
          }
        ]
      },
      annotation: annotations,
    };
  }

  public assembleLineChartColors() {
    return [
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointRadius: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // red
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderWidth: 1,
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointRadius: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointRadius: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
  }
}
