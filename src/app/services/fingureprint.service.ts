import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { FingurePrintOffice } from '../classes/colleges';
import { AdminService } from './admin.service';
@Injectable({
    providedIn: 'root',
})
export class FingureprintService {
    url = environment.ApiUrl;
    public fingureprintoffice:FingurePrintOffice=new FingurePrintOffice();
    public routerlink:string='';
    constructor(
        public http: HttpClient,
        public router: Router,
        public admin: AdminService
    ) {}
    async getConfigs() {
        var response=  await this.admin.getConfigs().toPromise();
        this.fingureprintoffice.fromJson(response);
        
    }
    connectDevice(data:any):Observable<any>{
        return this.http.post(this.url+"/fingureprint/connectdevice/",data)
    }
    getDeviceUsers(data:any):Observable<any>{
        return this.http.post(this.url+"/fingureprint/device/users",data)
    }
    monthlyReport(data:any){
        return this.http.post(this.url+"/fingureprint/fingureprintoffice/monthlyreport",data)
    }
    dailyReport(data:any){
        return this.http.post(this.url+"/fingureprint/fingureprintoffice/dailyReport",data)
    }
    employeeReport(data:any):Observable<any>{
        return this.http.post(this.url+"/fingureprint/fingureprintoffice/employeeReport",data);
    }


    getEmployees():Observable<any>{
        return this.http.get(this.url+"/fingureprint/Employees");
    }
    getEmployee(id:string):Observable<any>{
        return this.http.get(this.url+"/fingureprint/Employees/"+id);
    }

    deleteEmployee(id):Observable<any>{
        return this.http.delete(this.url+"/fingureprint/Employees/"+id)
    }
    updateEmployee(id,data):Observable<any>{
        return this.http.patch(this.url+"/fingureprint/Employees/"+id,data)
    }

    downloadUsersFromDevices(data):Observable<any>{
        return this.http.post(this.url+"/fingureprint/device/downloadUsers/",data)
    }

    addTimeOff(data):Observable<any>{
        return this.http.post(this.url+"/fingureprint/TimeOff/",data)
    }
    getEmployeeTimeOff(id:string):Observable<any>{
        return this.http.get(this.url+"/fingureprint/TimeOff/"+id)
    }

    deleteEmployeeTimeOff(id:string,data:any):Observable<any>{
        return this.http.delete(this.url+"/fingureprint/TimeOff/"+id+"/"+data.EmployeeId)
    }

    getEmployeeTimeOffByDate(id:string,data:any):Observable<any>{
        return this.http.post(this.url+"/fingureprint/TimeOff/"+id,data)
    }
    timeOffReport(data:any):Observable<any>{
        return this.http.post(this.url+"/fingureprint/fingureprintoffice/timeoffReport/",data)
    }

    addUserToDevice(data:any):Observable<any>{
        return this.http.post(this.url+"/fingureprint/device/addUserToDevice/",data)
    }

    
}
