import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private swUpdate: SwUpdate) {
    }

    ngOnInit() {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                console.log('load new version of logbook app...');
                window.location.reload();
                /*
                    if (confirm('Eine neue Version von Logbook ist verfügbar. Willst du sie laden?')) {
                        window.location.reload();
                    }
                */
            });
        }
    }
}
