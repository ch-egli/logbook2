import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/primeng';

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
        },
        {
          id: 'y-axis-2',
          position: 'left',
          ticks: {
            fontColor: 'green',
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
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private chartService: ChartService) {
    this.aboutMessage = 'Climbing Logbook 2';
  }

  ngOnInit(): any {
    this.chartDataObservable = this.chartService.getChartsData();
    this.chartDataObservable.subscribe((res) => {
      console.log(res);
      console.log(res.chartData);

      let set1 = <ChartDataSets>{
        data: res.chartData["Belastung"],
        label: "Belastung",
        yAxisID: "y-axis-0"
      }
      let set2 = <ChartDataSets>{
        data: res.chartData["ZuegeTotal"],
        label: "ZuegeTotal",
        yAxisID: "y-axis-1"
      }
      let set3 = <ChartDataSets>{
        data: res.chartData["Schlaf"],
        label: "Schlaf",
        yAxisID: "y-axis-2"
      }
      this.lineChartData = [];
      this.lineChartData.push(set1);
      this.lineChartData.push(set2);
      this.lineChartData.push(set3);
      this.lineChartLabels = res.labels;
    });
  }

  createMessages() {
    this.messages.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    this.messages.push({ severity: 'warn', summary: 'Warn Message', detail: 'Sample warning' });
    this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Sample error' });
  }

  // events
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
