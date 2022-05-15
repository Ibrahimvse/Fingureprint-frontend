import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FingurePrintOffice } from '../classes/colleges';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    url = environment.ApiUrl;
    constructor(private http: HttpClient) {}

    getConfigs(): Observable<FingurePrintOffice> {
        const base = this.http.get(this.url + '/admin/configs/');
        const request = base.pipe(
            map((data: FingurePrintOffice) => {
                return data;
            })
        );
        return request;
    }
    updateConfigs(data: any) {
        return this.http.patch(this.url + '/admin/configs/', data);
    }

    importDatabase(data: any): Observable<any> {
        return this.http.post(this.url + '/admin/importDatabase/', data);
    }
    importConfigs(data: any): Observable<any> {
        return this.http.post(this.url + '/admin/importConfigs/', data);
    }
    exportDatabase(){
        window.location.href=this.url+'/admin/exportDatabase/'
    }
    exportConfigs(){
        window.location.href=this.url+'/admin/exportConfigs/'
    }
}
