import { Component, OnInit } from '@angular/core';
import { FingureprintService } from '../../../services/fingureprint.service';

declare var $: any;
@Component({
    selector: 'app-topheader',
    templateUrl: './topheader.component.html',
    styleUrls: ['./topheader.component.scss'],
})
export class TopheaderComponent implements OnInit {
    constructor(public fingureprint: FingureprintService) {}

    ngOnInit(): void {
        $('#sidebarCollapse i,#dismiss').on('click', function () {
            $('.sidebar').toggleClass('active');
            $('.page-header').css('padding-right','65px');
            $('#sidebarCollapse i').toggleClass('hidden');
        });
    }
}
