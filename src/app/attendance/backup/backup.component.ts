import { Component, OnInit } from '@angular/core';
import { FingureprintService } from '../../services/fingureprint.service';
import { AdminService } from '../../services/admin.service';
import { RoutingService} from '../../services/routing.service';

@Component({
    selector: 'app-backup',
    templateUrl: './backup.component.html',
})
export class BackupComponent implements OnInit {
    isLoading:Boolean=false
    constructor(
        public admin: AdminService,
        public fingureprint: FingureprintService,
        public router:RoutingService
    ) {}

    async ngOnInit() {
        await this.fingureprint.getConfigs();
        this.fingureprint.routerlink=" ألنسخ الاحتياطي ";
    }
    importDatabase(event:any){
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            var data =new FormData();
            data.append('File',file,file.name);
            this.isLoading=true;
            this.admin.importDatabase(data).subscribe((response)=>{
                this.isLoading=false;
                this.router.navigateTo('fingureprint/employees')
            },
            (error)=>{
                alert("لم يتم استيراد قاعدة البيانات بشكل صحيح .. ألرجاء المحاولة مرة أخرى")
            })
        }
    }
    importConfigs(event:any){
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            var data =new FormData();
            data.append('File',file,file.name);
            this.isLoading=true;
            this.admin.importConfigs(data).subscribe((response)=>{
                this.isLoading=false;
                this.router.navigateTo('fingureprint/editcollege')
            },
            (error)=>{
                alert("لم يتم استيراد ألاعدادات بشكل صحيح .. ألرجاء المحاولة مرة أخرى")
            })
        }
        

    }
    exportDatabase(){

    }
    exportConfigs(){

    }
}
