import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
    public aboutMessage: string;
    public logbookVersion: string;
    public metaInfo: any;

    constructor() {
        this.aboutMessage = 'Über das Climbing Logbook 2';
        this.logbookVersion = '2.0.0';
        this.metaInfo = ''; //document.head.querySelector('[name=app-kind]').content;
    }

    ngOnInit() {
    }

}
