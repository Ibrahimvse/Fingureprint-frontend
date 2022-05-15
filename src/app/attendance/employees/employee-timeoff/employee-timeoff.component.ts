import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FingureprintService } from '../../../services/fingureprint.service';
import { RoutingService } from '../../../services/routing.service';
import { Employee } from '../../../classes/employee';
import { department } from '../../../classes/colleges';
import { dtOptions } from '../../../classes/datatable';
import { Period } from '../../../classes/util';
import { ModalService } from '../../../services/modal.service';

@Component({
    selector: 'app-employee-timeoff',
    templateUrl: './employee-timeoff.component.html',
})
export class EmployeeTimeoffComponent implements OnInit {
    Employee: Employee = new Employee();
    id: string;
    records: any[] = [];
    period: Period = new Period();
    dtOptions: any = {};
    isLoading: Boolean = false;
    SelectedItem: any = null;
    TimeOffPeriod = new Period();
    EmpolyeeTotalTime:string="00:00:00"
    TimePeriod = {
        starttime: '08:30',
        endtime: '09:00',
    };
    constructor(
        public fingureprint: FingureprintService,
        public Activerouter: ActivatedRoute,
        public router: RoutingService,
        public modal: ModalService
    ) {}

    async ngOnInit() {
        this.id = await this.Activerouter.snapshot.params['id'];
        this.dtOptions = {
            language: dtOptions.language,
            dom: 'Bfrtip',
            buttons: this.setBuutons(),
        };
        this.fingureprint.routerlink = '  تقرير الاجازات الزمنية للموظف ';
        await this.fingureprint.getConfigs();
        this.getEmployee();
        this.getEmployeeTimeOff();
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
    getEmployeeTimeOff(){
        this.fingureprint.getEmployeeTimeOff(this.id).subscribe((response)=>{
            this.records=response.results;
            this.EmpolyeeTotalTime=response.TotalTime;
            this.dtOptions.buttons = this.setBuutons();
        })
        
    }
    submit(frm: NgForm) {
        this.records = [];
        this.isLoading = true;
        var data = {
            startdate: this.period.start,
            enddate:this.period.end
        };
        this.fingureprint.getEmployeeTimeOffByDate(this.id,data).subscribe((response) => {
            this.isLoading = false;
            this.records = response.results;
            this.EmpolyeeTotalTime=response.TotalTime;
            this.dtOptions.buttons = this.setBuutons2();
        });
    }
    AddTimeOff() {
        this.records=[];
        var start=this.TimePeriod.starttime.split(':');
        var end =this.TimePeriod.endtime.split(':');
        var startDate = new Date(0, 0, 0, parseInt(start[0]), parseInt(start[1]), 0);
        var endDate = new Date(0, 0, 0, parseInt(end[0]), parseInt(end[1]), 0);
        var total=endDate.getTime()-startDate.getTime();
        var data = {
            EmployeeId: this.id,
            TimeOffDate: new Date(this.period.start),
            TimeOffOut: this.TimePeriod.starttime,
            TimeOffIn: this.TimePeriod.endtime,
            TimeOffTotal:total
        };
        this.fingureprint.addTimeOff(data).subscribe((response)=>{
            this.records=response.results;
            this.EmpolyeeTotalTime=response.TotalTime;
            this.dtOptions.buttons = this.setBuutons();
            this.modal.hide();
        })
    }
    delete(id: string) {
        this.records=[];
        var data={
            EmployeeId:this.id
        }
        this.isLoading=true;
        this.fingureprint.deleteEmployeeTimeOff(id,data).subscribe((response)=>{
            this.records=response.results;
            this.EmpolyeeTotalTime=response.TotalTime;
            this.dtOptions.buttons=this.setBuutons();
            this.isLoading=false;
            this.modal.hide();
        })
    }
    startTimeChange() {
        if (this.TimePeriod.starttime < '08:30')
            this.TimePeriod.starttime = '08:30';
        if (this.TimePeriod.starttime > '14:00')
            this.TimePeriod.starttime = '14:00';
        if (this.TimePeriod.starttime > this.TimePeriod.endtime)
            this.TimePeriod.endtime = this.TimePeriod.starttime;
    }
    endTimeChange() {
        if (this.TimePeriod.endtime < '08:30')
            this.TimePeriod.endtime = '08:30';
        if (this.TimePeriod.endtime > '14:00')
            this.TimePeriod.endtime = '14:00';
        if (this.TimePeriod.starttime > this.TimePeriod.endtime)
            this.TimePeriod.endtime = this.TimePeriod.starttime;
    }

    setBuutons2() {
        var startdate = this.period.start;
        var enddate = this.period.end;
        var name = this.Employee.name;
        var office = this.fingureprint.fingureprintoffice.name;
        var Difference_In_Time =
            new Date(this.period.end).getTime() -
            new Date(this.period.start).getTime();
        var days = Difference_In_Time / (86400 * 1000);
        var type = days > 7 ? ' الشهري ' : ' الاسبوعي ';
        var TotalTime =this.EmpolyeeTotalTime;
        var ButtonsOptions = {
            buttons: [
                {
                    extend: 'print',
                    orientation: 'landscape',
                    exportOptions: {
                        columns: [ 0, 1, 2,3,4],
                    },
                    text: '<i class="fa fa-print fa-lg px-2"></i> طباعة ',
                    title: function () {
                        return "<div style='font-size: 14px;'>My Title</div>";
                    },
                    className: 'btn btn-primary',
                    customize: function (win: any) {
                        $(win.document.body)
                            .css('direction', 'rtl')
                            .addClass('cairo-small');

                        var table = $(win.document.body).find('table');
                        table.addClass('compact').css('font-size', 'inherit');
                        win.document.title = ' التقرير ' + type;
                        var header = $(win.document.body).find('h1');
                        header.text(office);
                        header.css('text-align', 'center');
                        header.addClass('border py-3');
                        header.append(
                            "<h1 class='py-5'> تقرير الاجازات الزمنيه  " +
                                type +
                                'للموظف للفترة من  <br>' +
                                startdate +
                                ' الى ' +
                                enddate +
                                ' </h1>'
                        );
                        header.append('<h1 >' + name + '</h1>');

                        var footer="<div class='border py-3 px-5  my-3'><h1 class='d-inline py-2'>وقت الاجازات الكلي </h1><h1 class='py-2 d-inline float-end'>"+TotalTime+"</h1></div>";
                        $(win.document.body).append(footer)
                    },
                },
                {
                    extend: 'excel',
                    exportOptions: {
                        columns: [ 0, 1, 2,3,4],
                    },
                    text: '<i class="fa fa-file-excel fa-lg px-2"></i> تصدير اكسل',
                    className: 'btn btn-primary',
                },
            ],
        };
        return ButtonsOptions;
    }

    setBuutons() {
        var startdate = this.period.start;
        var enddate = this.period.end;
        var name = this.Employee.name;
        var office = this.fingureprint.fingureprintoffice.name;
        var Difference_In_Time =
            new Date(this.period.end).getTime() -
            new Date(this.period.start).getTime();
        var days = Difference_In_Time / (86400 * 1000);
        var type = days > 7 ? ' الشهري ' : ' الاسبوعي ';
        var TotalTime =this.EmpolyeeTotalTime;
        var ButtonsOptions = {
            buttons: [
                {
                    extend: 'print',
                    orientation: 'landscape',
                    exportOptions: {
                        columns: [ 0, 1, 2,3,4],
                    },
                    text: '<i class="fa fa-print fa-lg px-2"></i> طباعة ',
                    title: function () {
                        return "<div style='font-size: 14px;'>My Title</div>";
                    },
                    className: 'btn btn-primary',
                    customize: function (win: any) {
                        $(win.document.body)
                            .css('direction', 'rtl')
                            .addClass('cairo-small');

                        var table = $(win.document.body).find('table');
                        table.addClass('compact').css('font-size', 'inherit');
                        win.document.title = '  تقرير الاجازات الزمنيه - ' + name;
                        var header = $(win.document.body).find('h1');
                        header.text(office);
                        header.css('text-align', 'center');
                        header.addClass('border py-3');
                        header.append(
                            "<h1 class='py-5'>  تقرير الاجازات الزمنيه  الشامل  للموظف  </h1>"
                        );
                        header.append('<h1 >' + name + '</h1>');

                        var footer="<div class='border py-3 px-5  my-3'><h1 class='d-inline py-2'>وقت الاجازات الكلي </h1><h1 class='py-2 d-inline float-end'>"+TotalTime+"</h1></div>";
                        $(win.document.body).append(footer)
                    },
                },
                {
                    extend: 'excel',
                    exportOptions: {
                        columns: [ 0, 1, 2,3,4],
                    },
                    text: '<i class="fa fa-file-excel fa-lg px-2"></i> تصدير اكسل',
                    className: 'btn btn-primary',
                },
            ],
        };
        return ButtonsOptions;
    }
}
