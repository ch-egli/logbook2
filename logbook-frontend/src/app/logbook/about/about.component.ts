import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
    public aboutMessage: string;
    public logbookVersion: string;
    public metaInfo: any;

    constructor() {
        this.aboutMessage = 'Über das Climbing Logbook';
        this.logbookVersion = environment.logbookVersion;
        this.metaInfo = ''; //document.head.querySelector('[name=app-kind]').content;
    }

    ngOnInit() {
    }

}
