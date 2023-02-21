import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FingureprintService } from '../../../services/fingureprint.service';
import { RoutingService } from '../../../services/routing.service';
import { Employee } from '../../../classes/employee';
import { department } from '../../../classes/colleges';
import { dtOptions } from '../../../classes/datatable';

import {DateUtil,TimePeriod} from "../../../classes/util"
@Component({
    selector: 'app-employee-report',
    templateUrl: './employee-report.component.html',
})
export class EmployeeReportComponent implements OnInit {
    Employee: Employee = new Employee();
    id: string;
    records:any[]=[];
    devices:any[]=[];
    period:TimePeriod;
    dtOptions:any = {};
    isLoading:Boolean=false;
    constructor(
        public fingureprint: FingureprintService,
        public Activerouter: ActivatedRoute,
        public router: RoutingService
    ) {}

    async ngOnInit()  {
        this.id = await this.Activerouter.snapshot.params['id'];
        this.period=new TimePeriod();
        this.dtOptions = {
            language: dtOptions.language,
            dom: 'Bfrtip',
            buttons: this.setBuutons(),
        };
        this.fingureprint.routerlink = ' تقرير الموظف ';
        await this.fingureprint.getConfigs();
        this.devices = this.fingureprint.fingureprintoffice.Devices;
        this.connectDevices();
        this.getEmployee();
    }
    connectDevices(){
        this.devices.forEach(d=>{
            d.status="connecting"
            this.fingureprint.connectDevice(d).subscribe((response)=>{
                d.status=response.status;
            })
        })
    }
    getEmployee() {
        this.fingureprint.getEmployee(this.id).subscribe(
            (response) => {
                this.Employee = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    submit(frm: NgForm) {
        this.records=[];
        this.isLoading=true;
        var connectdDevices=this.devices.filter(d=>d.status=='yes')
        var data={
            id:this.id,
            dates:this.period,
            devices:connectdDevices
        }
        this.fingureprint.employeeReport(data).subscribe(response=>{
            this.isLoading=false;
            this.dtOptions.buttons=this.setBuutons();
            this.records=<Array<any>>response;
            this.dtOptions.buttons=this.setBuutons()
            
        }) 
    }

    setBuutons(){
        var startdate=DateUtil.getDateString(this.period.start);
        var enddate=DateUtil.getDateString(this.period.end);
        var name=this.Employee.name;
        var office=this.fingureprint.fingureprintoffice.name;
        var Difference_In_Time=new Date(this.period.end).getTime()-new Date(this.period.start).getTime();
        var days=Difference_In_Time/(86400*1000);
        var type=days>7?' الشهري ':' الاسبوعي '
        var ButtonsOptions={
            buttons: [
                {
                    extend: 'print',
                    text: '<i class="fa fa-print fa-lg px-2"></i> طباعة ',
                    title:function(){
                        return "<div style='font-size: 14px;'>My Title</div>";
                    },
                    className:'btn btn-primary',
                    customize: function ( win:any ) {
                        $(win.document.body)
                            .css('direction','rtl').addClass('cairo-small')
        
        
                        var table=$(win.document.body).find( 'table' );
                        table.addClass( 'compact' ).css( 'font-size', 'inherit' );    
                        win.document.title=" التقرير "+type;
                        var header=$(win.document.body).find('h1');
                        header.text(office);
                        header.css('text-align','center');
                        header.addClass('border py-3')
                        header.append("<h1 class='py-5'> تقرير الغياب "+type +" للفترة من "+startdate+" الى "+enddate+" </h1>")
                        header.append("<h1 >"+name+"</h1>");
                    }
                },
                {
                    extend: 'excel',
                    text: '<i class="fa fa-file-excel fa-lg px-2"></i> تصدير اكسل',
                    className:'btn btn-primary',
                }
            ]
        }
        return ButtonsOptions;
    }
}
