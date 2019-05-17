import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartMetaType } from './chart.model';

@Injectable()
export class ChartService {
    readonly ENDPOINT_URL_LOCAL = 'http://192.168.1.121:8080/v1/charts/zoe/2018';
    // readonly ENDPOINT_URL_LOCAL = 'https://192.168.1.121:8443/v1/charts/zoe/2019';


    constructor(private http: HttpClient) {
    }

    getChartsData(): Observable<ChartMetaType> {
        return this.http.get<ChartMetaType>(this.ENDPOINT_URL_LOCAL);
    }
}
