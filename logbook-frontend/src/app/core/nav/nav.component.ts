import {Component} from '@angular/core';
import {Observable} from 'rxjs';

interface NavItem {
    displayName: string;
    routerLink: string;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './nav.component.html'
})
export class NavComponent {

    public navItems: Array<NavItem> = [
        {displayName: 'Home', routerLink: 'home'},
        {displayName: 'Theme', routerLink: 'theme'},
        {displayName: 'Charts', routerLink: 'charts'},
        {displayName: 'About', routerLink: 'about'}
    ];

    constructor() {
    }

}
