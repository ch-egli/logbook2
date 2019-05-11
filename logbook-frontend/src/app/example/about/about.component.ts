import {Component, OnInit, ViewChild} from '@angular/core';
import {Message} from 'primeng/primeng';

import {PostsService} from './posts.service';
import {ChartMetaType} from './posts.model';
import {Observable} from 'rxjs';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    providers: [PostsService]
})
export class AboutComponent implements OnInit {
    public aboutMessage: string;
    public messages: Array<Message> = [];

    public chartDataObservable : Observable<ChartMetaType> ;
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
      }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [pluginAnnotations];

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    constructor(private postsService: PostsService) {
        this.aboutMessage = 'Climbing Logbook 2';
    }

    ngOnInit(): any {
        this.chartDataObservable = this.postsService.getChartsData();
        this.chartDataObservable.subscribe((res)=>{
            console.log(res);
            this.lineChartData = res.chartData;
            this.lineChartLabels = res.labels;
        });
    }

    createMessages() {
        this.messages.push({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
        this.messages.push({severity: 'warn', summary: 'Warn Message', detail: 'Sample warning'});
        this.messages.push({severity: 'error', summary: 'Error Message', detail: 'Sample error'});
    }

/*
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', yAxisID: 'y-axis-0' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', yAxisID: 'y-axis-0' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
*/
/*
  public lineChartData: ChartDataSets[] = [
    {"data":[15.0,6.0,15.0,17.0,12.0,13.0,16.0,18.0],"label":"Belastung","yAxisID":"y-axis-0"},
    {"data":[0.0,0.0,3.0,150.0,30.0,60.0,0.0,130.0],"label":"Zuege34","yAxisID":"y-axis-1"},
    {"data":[0.0,0.0,903.0,300.0,130.0,330.0,300.0,280.0],"label":"ZuegeTotal","yAxisID":"y-axis-1"}
  ];
  public lineChartLabels: Label[] = ["2019-02-16","2019-02-15","2019-02-15_2","2019-02-13","2019-02-12","2019-02-12_2","2019-02-11","2019-02-10"];
*/
/*
  public lineChartData: ChartDataSets[] = [
    {"data":[15.0,6.0,15.0,17.0,13.0,12.0,16.0,18.0,15.0,14.0,15.0,17.0,14.0,16.0,17.0,16.0,15.0,13.0,13.0,15.0,12.0,14.0,16.0,14.0,6.0,10.0,17.0,16.0,15.0,13.0,15.0,16.0,14.0,16.0,15.0,14.0,13.0,15.0,15.0,15.0,16.0,6.0,14.0,14.0,15.0,15.0,15.0,15.0,15.0,14.0,16.0,16.0],"label":"Belastung","yAxisID":"y-axis-0"},{"data":[0.0,0.0,3.0,150.0,60.0,30.0,0.0,130.0,100.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,20.0,70.0,2.0,0.0,80.0,0.0,150.0,0.0,0.0,100.0,60.0,80.0,10.0,20.0,80.0,30.0,1.0,60.0,20.0,20.0,0.0,50.0,0.0,30.0,0.0,60.0,80.0,30.0,20.0,50.0,100.0,70.0,100.0,0.0,30.0],"label":"Zuege34","yAxisID":"y-axis-1"},{"data":[0.0,0.0,903.0,300.0,330.0,130.0,300.0,280.0,450.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,250.0,670.0,662.0,130.0,430.0,300.0,400.0,0.0,300.0,350.0,560.0,310.0,140.0,230.0,210.0,230.0,401.0,560.0,140.0,140.0,200.0,140.0,0.0,240.0,0.0,210.0,230.0,150.0,220.0,190.0,250.0,230.0,250.0,0.0,230.0],"label":"ZuegeTotal","yAxisID":"y-axis-1"}
  ];
  public lineChartLabels: Label[] = [
    "2019-02-16","2019-02-15","2019-02-15_2","2019-02-13","2019-02-12","2019-02-12_2","2019-02-11","2019-02-10","2019-02-09","2019-02-09_2","2019-02-08","2019-02-07","2019-02-06","2019-02-05","2019-02-04","2019-02-03","2019-02-02","2019-02-01","2019-01-31","2019-01-30","2019-01-29","2019-01-29_2","2019-01-28","2019-01-27","2019-01-26","2019-01-25","2019-01-24","2019-01-23","2019-01-22","2019-01-22_2","2019-01-21","2019-01-20","2019-01-18","2019-01-17","2019-01-16","2019-01-15","2019-01-15_2","2019-01-14","2019-01-13","2019-01-12","2019-01-11","2019-01-10","2019-01-09","2019-01-08","2019-01-08_2","2019-01-07","2019-01-06","2019-01-05","2019-01-03","2019-01-02","2019-01-01","2018-12-31"
  ];
*/

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
