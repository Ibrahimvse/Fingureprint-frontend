import { Component, OnInit } from '@angular/core';
import { FingurePrintOffice } from '../../../classes/colleges';
import { AdminService } from '../../../services/admin.service';
import { RoutingService } from '../../../services/routing.service';
import { ActivatedRoute } from '@angular/router';
import { FingureprintService } from '../../../services/fingureprint.service';

@Component({
    selector: 'app-edit-college',
    templateUrl: './new-college.component.html',
    styleUrls: ['./new-college.component.scss'],
})
export class EditCollegeComponent implements OnInit {
    FingurePrintOffice:  FingurePrintOffice = new  FingurePrintOffice();
    constructor(
        public admin: AdminService,
        public router: RoutingService,
        public Activerouter: ActivatedRoute,
        public fingureprint: FingureprintService
    ) {}
    async ngOnInit() {
        this.fingureprint.routerlink="ألاعدادات";
        var response=  await this.admin.getConfigs().toPromise();
        this.FingurePrintOffice.fromJson(response);
        
    }
    submit() {
        this.admin
            .updateConfigs( this.FingurePrintOffice)
            .subscribe((response) => {
                this.router.navigateTo('/fingureprint/devices', {});
            });
    }
}
