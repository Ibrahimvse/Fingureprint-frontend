import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FingureprintService } from '../../services/fingureprint.service';
import { dtOptions, monthlyButtonsOptions } from '../../classes/datatable';
import { DataTableDirective } from 'angular-datatables';
import { TimePeriod,DateUtil } from '../../classes/util';


@Component({
    selector: 'app-daily-report',
    templateUrl: './daily-report.component.html',
})
export class DailyReportComponent implements OnInit {
    records: any[] = [];
    devices: any[] = [];
    period:TimePeriod=new TimePeriod();
    dtOptions: any = {};
    isLoading: Boolean = false;
    report_type:string="inout";
    constructor(public fingureprint: FingureprintService) {}

    async ngOnInit() {
        this.fingureprint.routerlink="التقرير اليومي"
        this.dtOptions = {
            language: dtOptions.language,
            dom: 'Bfrtip',
            buttons: this.setBuutons(),
        };
        await this.fingureprint.getConfigs();
        this.devices = this.fingureprint.fingureprintoffice.Devices;
        this.connectDevices();
    }
    connectDevices() {
        this.devices.forEach((d) => {
            d.status = 'connecting';
            this.fingureprint.connectDevice(d).subscribe((response) => {
                d.status = response.status;
            });
        });
    }
    submit(frm: NgForm) {
        this.records=[];
        this.isLoading=true;
        var connectdDevices=this.devices.filter(d=>d.status=='yes')
        var data={
            report_type:this.report_type,
            dates:this.period,
            devices:connectdDevices
        }
        this.fingureprint.dailyReport(data).subscribe(response=>{
            this.isLoading=false;
            this.dtOptions.buttons=this.setBuutons();
            this.records=<Array<any>>response;
        }) 
    }
    setBuutons(){
        var date=DateUtil.getDateString(this.period.start)
        var office=this.fingureprint.fingureprintoffice.name;
        var admin=this.fingureprint.fingureprintoffice.admin;
        var type=" الحضور والانصراف ";
        if(this.report_type=='in') type=" الحضور " ;
        if(this.report_type=='out') type=" الانصراف ";
        var ButtonsOptions={
            buttons: [
                {
                    extend: 'print',
                    text: '<i class="fa fa-print fa-lg px-2"></i> طباعة ',
                    orientation: 'landscape',
                    className:'btn btn-primary',
                    customize: function ( win:any ) {
                        $(win.document.body)
                            .css('direction','rtl').addClass('cairo-small')
        
        
                        var table=$(win.document.body).find( 'table' );
                        table.addClass( 'compact' ).css( 'font-size', 'inherit' );    
                        win.document.title="تقرير "+type+" اليومي "+date;
                        var header=$(win.document.body).find('h1');
                        header.text(office);
                        header.css('text-align','center');
                        header.addClass('border py-3')
                        header.append("<h1 class='py-5'>  تقرير "+ type +" اليومي  ليوم " +date +" </h1>")
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
