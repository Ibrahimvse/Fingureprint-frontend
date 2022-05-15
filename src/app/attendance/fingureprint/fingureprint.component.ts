import { Component, OnInit } from '@angular/core';
import { FingureprintService } from '../../services/fingureprint.service';
@Component({
    selector: 'app-fingureprint',
    templateUrl: './fingureprint.component.html',
})
export class FingureprintComponent implements OnInit {
    userPath: string;

    constructor(public fingureprint: FingureprintService) {
        this.fingureprint.getConfigs();
    }
    ngOnInit(): void {}
}
