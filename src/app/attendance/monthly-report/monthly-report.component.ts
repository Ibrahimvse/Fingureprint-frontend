import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FingureprintService } from '../../services/fingureprint.service';
import { dtOptions,monthlyButtonsOptions } from '../../classes/datatable';
import { DataTableDirective } from 'angular-datatables';
import {Period} from "../../classes/util"
declare var $:JQueryStatic;
@Component({
    selector: 'app-monthly-report',
    templateUrl: './monthly-report.component.html',
})
export class MonthlyReportComponent implements OnInit {
    records:any[]=[];
    devices:any[]=[];
    period: Period = new Period();
    dtOptions:any = {};
    isLoading:Boolean=false;
    
    constructor( public fingureprint:FingureprintService) {}

    async ngOnInit() {
        this.fingureprint.routerlink="التقرير الشهري";
        this.dtOptions={
            language:dtOptions.language,
            dom: 'Bfrtip',
            buttons:this.setBuutons()
        }
        await this.fingureprint.getConfigs();
        this.devices = this.fingureprint.fingureprintoffice.Devices;
        this.connectDevices();
    }
    connectDevices(){
        this.devices.forEach(d=>{
            d.status="connecting"
            this.fingureprint.connectDevice(d).subscribe((response)=>{
                d.status=response.status;
            })
        })
    }
    submit(frm: NgForm) {
        this.records=[];
        this.isLoading=true;
        var connectdDevices=this.devices.filter(d=>d.status=='yes')
        var data={
            dates:this.period,
            devices:connectdDevices
        }
        this.fingureprint.monthlyReport(data).subscribe(response=>{
            this.isLoading=false;
            this.dtOptions.buttons=this.setBuutons();
            this.records=<Array<any>>response;
        }) 
    }

    setBuutons(){
        var startdate=this.period.start;
        var enddate=this.period.end;
        var office=this.fingureprint.fingureprintoffice.name;
        var admin=this.fingureprint.fingureprintoffice.admin;
        var Difference_In_Time=new Date(this.period.end).getTime()-new Date(this.period.start).getTime();
        var days=Difference_In_Time/(86400*1000);
        var type=days>7?' الشهري ':' الاسبوعي '
        var ButtonsOptions={
            buttons: [
                {
                    extend: 'print',
                    orientation: 'landscape',
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
                        var footer="<div class='border py-3 text-center my-3'><h1 class='py-2'>مدير ألدائره</h1><h1 class='py-2'>"+admin+"</h1></div>";
                        $(win.document.body).append(footer)
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
