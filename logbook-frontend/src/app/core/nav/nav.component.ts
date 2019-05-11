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
        {displayName: 'About', routerLink: 'about'},
        {displayName: 'Theme', routerLink: 'theme'}
    ];

    public isCollapsed = true;

    constructor() {
    }

}
