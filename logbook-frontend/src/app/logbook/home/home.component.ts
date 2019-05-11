/**
* Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
*
* ESTA WebJS: Page Object für die About Seite
*
* @author u218609 (Kevin Kreuzer)
* @version: 2.0.0
* @since 10.05.2017, 2017.
*/
import{Component}from'@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    title: string;
    welcomeMessage: string;

    constructor() {
        this.title = 'Climbing Logbook 2';
        this.welcomeMessage = 'Herzlich Willkommen';
    }

    single: any[];

    multi: any[] =
        [{"name":"Belastung","series":[{"name":"2019-02-16","value":15.0},{"name":"2019-02-15","value":6.0},{"name":"2019-02-15_2","value":15.0},{"name":"2019-02-13","value":17.0},{"name":"2019-02-12","value":13.0},{"name":"2019-02-12_2","value":12.0},{"name":"2019-02-11","value":16.0},{"name":"2019-02-10","value":18.0},{"name":"2019-02-09","value":15.0},{"name":"2019-02-09_2","value":14.0},{"name":"2019-02-08","value":15.0},{"name":"2019-02-07","value":17.0},{"name":"2019-02-06","value":14.0},{"name":"2019-02-05","value":16.0},{"name":"2019-02-04","value":17.0},{"name":"2019-02-03","value":16.0},{"name":"2019-02-02","value":15.0},{"name":"2019-02-01","value":13.0},{"name":"2019-01-31","value":13.0},{"name":"2019-01-30","value":15.0},{"name":"2019-01-29","value":12.0},{"name":"2019-01-29_2","value":14.0},{"name":"2019-01-28","value":16.0},{"name":"2019-01-27","value":14.0},{"name":"2019-01-26","value":6.0},{"name":"2019-01-25","value":10.0},{"name":"2019-01-24","value":17.0},{"name":"2019-01-23","value":16.0},{"name":"2019-01-22","value":15.0},{"name":"2019-01-22_2","value":13.0},{"name":"2019-01-21","value":15.0},{"name":"2019-01-20","value":16.0},{"name":"2019-01-18","value":14.0},{"name":"2019-01-17","value":16.0},{"name":"2019-01-16","value":15.0},{"name":"2019-01-15","value":14.0},{"name":"2019-01-15_2","value":13.0},{"name":"2019-01-14","value":15.0},{"name":"2019-01-13","value":15.0},{"name":"2019-01-12","value":15.0},{"name":"2019-01-11","value":16.0},{"name":"2019-01-10","value":6.0},{"name":"2019-01-09","value":14.0},{"name":"2019-01-08","value":14.0},{"name":"2019-01-08_2","value":15.0},{"name":"2019-01-07","value":15.0},{"name":"2019-01-06","value":15.0},{"name":"2019-01-05","value":15.0},{"name":"2019-01-03","value":15.0},{"name":"2019-01-02","value":14.0},{"name":"2019-01-01","value":16.0},{"name":"2018-12-31","value":16.0}]},
         {"name":"Total Zuege","series":[{"name":"2019-02-16","value":0.0},{"name":"2019-02-15","value":0.0},{"name":"2019-02-15_2","value":9.03},{"name":"2019-02-13","value":3.0},{"name":"2019-02-12","value":3.3},{"name":"2019-02-12_2","value":1.3},{"name":"2019-02-11","value":3.0},{"name":"2019-02-10","value":2.8},{"name":"2019-02-09","value":4.5},{"name":"2019-02-09_2","value":0.0},{"name":"2019-02-08","value":0.0},{"name":"2019-02-07","value":0.0},{"name":"2019-02-06","value":0.0},{"name":"2019-02-05","value":0.0},{"name":"2019-02-04","value":0.0},{"name":"2019-02-03","value":0.0},{"name":"2019-02-02","value":0.0},{"name":"2019-02-01","value":2.5},{"name":"2019-01-31","value":6.7},{"name":"2019-01-30","value":6.62},{"name":"2019-01-29","value":1.3},{"name":"2019-01-29_2","value":4.3},{"name":"2019-01-28","value":3.0},{"name":"2019-01-27","value":4.0},{"name":"2019-01-26","value":0.0},{"name":"2019-01-25","value":3.0},{"name":"2019-01-24","value":3.5},{"name":"2019-01-23","value":5.6},{"name":"2019-01-22","value":3.1},{"name":"2019-01-22_2","value":1.4},{"name":"2019-01-21","value":2.3},{"name":"2019-01-20","value":2.1},{"name":"2019-01-18","value":2.3},{"name":"2019-01-17","value":4.01},{"name":"2019-01-16","value":5.6},{"name":"2019-01-15","value":1.4},{"name":"2019-01-15_2","value":1.4},{"name":"2019-01-14","value":2.0},{"name":"2019-01-13","value":1.4},{"name":"2019-01-12","value":0.0},{"name":"2019-01-11","value":2.4},{"name":"2019-01-10","value":0.0},{"name":"2019-01-09","value":2.1},{"name":"2019-01-08","value":2.3},{"name":"2019-01-08_2","value":1.5},{"name":"2019-01-07","value":2.2},{"name":"2019-01-06","value":1.9},{"name":"2019-01-05","value":2.5},{"name":"2019-01-03","value":2.3},{"name":"2019-01-02","value":2.5},{"name":"2019-01-01","value":0.0},{"name":"2018-12-31","value":2.3}]}]
/*
        [{"name":"Belastung",
         "series":[{"name":"2019-02-16","value":15.0},
                   {"name":"2019-02-15","value":6.0},
                   {"name":"2019-02-15_2","value":15.0},
                   {"name":"2019-02-13","value":17.0},
                   {"name":"2019-02-12","value":12.0},
                   {"name":"2019-02-12_2","value":13.0},
                   {"name":"2019-02-11","value":16.0},
                   {"name":"2019-02-10","value":18.0}]},
        {"name":"Total Zuege",
         "series":[{"name":"2019-02-16","value":0.0},
                   {"name":"2019-02-15","value":0.0},
                   {"name":"2019-02-15_2","value":9.03},
                   {"name":"2019-02-13","value":3.0},
                   {"name":"2019-02-12","value":1.3},
                   {"name":"2019-02-12_2","value":3.3},
                   {"name":"2019-02-11","value":3.0},
                   {"name":"2019-02-10","value":2.8}]}]
*/

    view: any[] = [1112 , 500];
    //view: any[] = [];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Datum';
    showYAxisLabel = true;
    yAxisLabel = 'TotalZuege/100 - Belastung';
    timeline = true;

    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    // line, area
    autoScale = true;

    onSelect(event) {
      console.log(event);
    }

}
