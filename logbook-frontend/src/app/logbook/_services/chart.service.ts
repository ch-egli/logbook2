import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartMetaType, BarChartData } from '../_model/chart.model';

import { environment } from '../../../environments/environment';

@Injectable()
export class ChartService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl + 'v1/';
    }

    getChartsData(user: string, year: string): Observable<ChartMetaType> {
        console.log('getChartData with user ' + user + ' and year ' + year);
        return this.http.get<ChartMetaType>(this.baseUrl + 'charts/' + user + '/' + year);
    }

    getBarChartData(user: string, year: string): Observable<Map<string, BarChartData>> {
        console.log('getBarChartData...');
        return this.http.get<Map<string, BarChartData>>(this.baseUrl + 'charts2/' + user + '/' + year);
    }
}
