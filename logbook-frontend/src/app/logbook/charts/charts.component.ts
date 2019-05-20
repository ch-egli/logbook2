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

  public chartDataObservable: Observable<ChartMetaType>;
  public lineChartData: ChartDataSets[] = [{ data: [] }]
  public lineChartLabels: Label[] = []

  public myChartData: Map<string, any[]>;
  public chartOptions0: SelectItem[] = [{ label: 'Wähle...', value: null }];
  public chartOptions1: SelectItem[] = [{ label: 'Wähle...', value: null }];
  public selectedChart0: string = 'Wähle...';
  public selectedChart1: string = 'Wähle...';

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

  constructor(private chartService: ChartService) {
    this.aboutMessage = 'Climbing Logbook 2';
  }

  ngOnInit(): any {
    let me = this;
    this.chartDataObservable = this.chartService.getChartsData();
    this.chartDataObservable.subscribe((res) => {
      me.myChartData = res.chartData;
      //console.log(res);
      console.log(me.myChartData);


      const set1 = <ChartDataSets>{
        data: res.chartData[this.selectedChart0],
        label: this.selectedChart0,
        yAxisID: 'y-axis-0'
      }
      const set2 = <ChartDataSets>{
        data: res.chartData[this.selectedChart1],
        label: this.selectedChart1,
        yAxisID: 'y-axis-1'
      }

      const optionValues: string[] = Array.from(Object.keys(res.chartData));
      console.log('optionValues: ' + optionValues);
      optionValues.forEach((optVal) => {
        this.chartOptions0.push({ label: optVal, value: optVal });
      });
      console.log(this.chartOptions0);
      optionValues.forEach((optVal) => {
        this.chartOptions1.push({ label: optVal, value: optVal });
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
  onSelectChart0(event) {
    console.log('chart1 selected:' + event.value);
    if (event.value === null) {
      this.chart.hideDataset(0, true);
    } else {
      this.lineChartLegend = true;
      this.chart.hideDataset(0, false);
      const dataSet = <ChartDataSets>{
        data: this.myChartData[event.value],
        label: event.value,
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

  onSelectChart1(event) {
    console.log('chart2 selected: ' + event.value);
    if (event.value === null) {
      this.chart.hideDataset(1, true);
    } else {
      this.lineChartLegend = true;
      this.chart.hideDataset(1, false);
      const dataSet = <ChartDataSets>{
        data: this.myChartData[event.value],
        label: event.value,
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
