import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartMetaType, BarChartData } from '../_model/chart.model';

@Injectable()
export class ChartService {
    readonly ENDPOINT_URL_LOCAL = 'http://192.168.1.121:8080/v1';
    // readonly ENDPOINT_URL_LOCAL = 'https://192.168.1.121:8443/v1/charts/zoe/2019';


    constructor(private http: HttpClient) {
    }

    getChartsData(user: string, year: string): Observable<ChartMetaType> {
        console.log('getChartData with user ' + user + ' and year ' + year);
        return this.http.get<ChartMetaType>(this.ENDPOINT_URL_LOCAL + '/charts/' + user + '/' + year);
    }

    getBarChartData(user: string, year: string): Observable<Map<string, BarChartData>> {
        console.log('getBarChartData...');
        return this.http.get<Map<string, BarChartData>>(this.ENDPOINT_URL_LOCAL + '/charts2/' + user + '/' + year);
    }
}
