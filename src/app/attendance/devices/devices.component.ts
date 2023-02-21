import { Component, OnInit } from '@angular/core';
import { FingureprintService } from '../../services/fingureprint.service';
import { dtOptions } from '../../classes/datatable';
import { DataTableDirective } from 'angular-datatables';
import { ModalService } from '../../services/modal.service';


@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
})
export class DevicesComponent implements OnInit {
    devices: any[]=[];
    dtOptions: DataTables.Settings = {};
    Users:any[]=[];
    isLoading:Boolean=false;
    SelectedDevice:any;
    mode:string="deviceUsers"
    newUserName:string=""
    constructor(public fingureprint: FingureprintService,public modal: ModalService) {}

    async ngOnInit() {
        this.fingureprint.routerlink="الاجهزة المتصلة"
        this.dtOptions=dtOptions;
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

    getDeviceUsers(d:any){
        this.mode="deviceUsers"
        if(d.status=="yes") {
            this.SelectedDevice=d;
            this.Users=[];
            this.isLoading=true;
            this.fingureprint.getDeviceUsers(d).subscribe((response)=>{
                this.Users=response;
                this.isLoading=false;
            })
        }

    }
    doanLoadUsers(){
        var connectedDevices=this.devices.filter((d)=>d.status=='yes');
        var data={
            devices:connectedDevices
        }
        this.Users=[];
        this.mode="newUsers"
        this.isLoading=true;
        this.fingureprint.downloadUsersFromDevices(data).subscribe((response)=>{
            this.Users=response;
            this.isLoading=false;
        })

    }

    addUserToDevices(){
        var connectedDevices=this.devices.filter((d)=>d.status=='yes');
        var data={
            devices:connectedDevices,
            user:{
                name:this.newUserName
            }
        }

        this.isLoading=true;
        this.fingureprint.addUserToDevice(data).subscribe((response)=>{
            this.modal.hide();
            this.doanLoadUsers();
            this.isLoading=false;
        })

    }
}
