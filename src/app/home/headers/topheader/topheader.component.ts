import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
    selector: 'app-topheader',
    templateUrl: './topheader.component.html',
    styleUrls: ['./topheader.component.scss'],
})
export class TopheaderComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        $('#sidebarCollapse i,#dismiss').on('click', function () {
            $('.sidebar').toggleClass('active');
            $('.page-header').css('padding-right','65px');
            $('#sidebarCollapse i').toggleClass('hidden');
        });
    }
}
