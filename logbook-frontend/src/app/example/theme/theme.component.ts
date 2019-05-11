/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Page Object für die About Seite
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 10.05.2017, 2017.
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuItem, Message, SelectItem} from 'primeng/primeng';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html'
})
export class ThemeComponent implements OnInit {

    public primengBaseDocumentationUrl = 'https://www.primefaces.org/primeng/#/';
    public breadCrumbItems: Array<MenuItem>;
    public splitButtonItems: Array<MenuItem>;
    public selectButtonItems: Array<SelectItem>;
    public selectedListBoxItemOne: string;
    public selectedListBoxItemTwo: string;
    public selectedListBoxItemThree: string;
    public multiSelectSelectedItem: string;
    public tableItems: Array<any>;
    public tableColumns: Array<any>;
    public listBoxItemsOne: Array<SelectItem>;
    public listBoxItemsTwo: Array<SelectItem>;
    public listBoxItemsThree: Array<SelectItem>;
    public multiSelectItems: Array<SelectItem>;
    public fb: FormBuilder;
    public userform: FormGroup;
    public genders: SelectItem[];
    public msgs: Message[] = [];
    public date1: Date;
    public date2: Date;
    public date3: Date;
    public date4: Date;
    public date5: Date;
    public date6: Date;
    public date7: Date;
    public date8: Date;
    public checked = true;
    public text: string;
    public disabled = true;
    public sliderVal1: number;
    public sliderVal2 = 50;
    public sliderVal3: number;
    public sliderVal4: number;
    public sliderRangeValues: number[] = [20, 80];
    public selectButtonTypes: SelectItem[];
    public selectButtonSelectedType: string;
    public selectButtonSelectedTypes: string[] = ['Apartment', 'Studio'];
    public stepItems: MenuItem [];
    public activStepIndex: number;
    public menuItems: MenuItem [];
    public inputSwitchValue: any;
    public selectedCities: Array<string>;

    constructor(private confirmationService: ConfirmationService) {
        this.fb = new FormBuilder();
    }

    ngOnInit() {
        this.breadCrumbItems = this.createBreadCrumbItems();
        this.splitButtonItems = this.createSplitButtonItems();
        this.selectButtonItems = this.createCities();
        this.listBoxItemsOne = this.createCities();
        this.listBoxItemsTwo = this.createCities();
        this.listBoxItemsThree = this.createCars();
        this.multiSelectItems = this.createCars();
        this.tableItems = this.createTableItems();
        this.stepItems = this.createStepItems();
        this.tableColumns = this.createTableColumns();
        this.selectButtonTypes = this.createAppartements();
        this.initUserForm();
        this.menuItems = this.createMenuItems();
    }

    private createBreadCrumbItems(): Array<MenuItem> {
        const breadCrumbItems = [];
        breadCrumbItems.push({label: 'Categories'});
        breadCrumbItems.push({label: 'Sports'});
        breadCrumbItems.push({label: 'Football'});
        breadCrumbItems.push({label: 'Countries'});
        breadCrumbItems.push({label: 'Spain'});
        breadCrumbItems.push({label: 'Real Madrid'});
        breadCrumbItems.push({label: 'Squad'});
        breadCrumbItems.push({label: 'Sergio Ramos', url: 'https://de.wikipedia.org/wiki/Sergio_Ramos'});
        return breadCrumbItems;
    }

    private createCities(): Array<SelectItem> {
        const cities = [];
        cities.push({label: 'New York', value: 'New York'});
        cities.push({label: 'Rome', value: 'Rome'});
        cities.push({label: 'London', value: 'London'});
        cities.push({label: 'Istanbul', value: 'Istanbul'});
        cities.push({label: 'Paris', value: 'Paris'});
        return cities;
    }

    private createCars(): Array<SelectItem> {
        const cars = [];
        cars.push({label: 'Audi', value: 'Audi'});
        cars.push({label: 'BMW', value: 'BMW'});
        cars.push({label: 'Fiat', value: 'Fiat'});
        cars.push({label: 'Ford', value: 'Ford'});
        cars.push({label: 'Honda', value: 'Honda'});
        cars.push({label: 'Jaguar', value: 'Jaguar'});
        cars.push({label: 'Mercedes', value: 'Mercedes'});
        cars.push({label: 'Renault', value: 'Renault'});
        cars.push({label: 'VW', value: 'VW'});
        cars.push({label: 'Volvo', value: 'Volvo'});
        return cars;
    }

    private createAppartements(): Array<SelectItem> {
        const types = [];
        types.push({label: 'Apartment', value: 'Apartment'});
        types.push({label: 'House', value: 'House'});
        types.push({label: 'Studio', value: 'Studio'});
        return types;
    }

    private createSplitButtonItems(): Array<MenuItem> {
        return [
            {label: 'Update', icon: 'fa-refresh'},
            {label: 'Delete', icon: 'fa-close'},
            {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'fa-paint-brush'}
        ];
    }

    private createStepItems(): Array<MenuItem> {
        return [{
            label: 'Personal',
            command: (event: any) => {
                this.activStepIndex = 0;
                this.msgs.length = 0;
                this.msgs.push({severity: 'info', summary: 'First Step', detail: event.item.label});
            }
        },
            {
                label: 'Seat',
                command: (event: any) => {
                    this.activStepIndex = 1;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Seat Selection', detail: event.item.label});
                }
            },
            {
                label: 'Payment',
                command: (event: any) => {
                    this.activStepIndex = 2;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Pay with CC', detail: event.item.label});
                }
            },
            {
                label: 'Confirmation',
                command: (event: any) => {
                    this.activStepIndex = 3;
                    this.msgs.length = 0;
                    this.msgs.push({severity: 'info', summary: 'Last Step', detail: event.item.label});
                }
            }
        ];
    }

    private createTableColumns() {
        const columns: Array<string> = [];
        columns.push(this.createColumn('firstname', 'firstname'));
        columns.push(this.createColumn('lastname', 'lastname'));
        columns.push(this.createColumn('position', 'position'));
        columns.push(this.createColumn('club', 'club'));
        return columns;
    }

    private createColumn(field: string, header: string): any {
        return {field, header};
    }

    private createTableItems(): Array<any> {
        const players: Array<any> = [];
        players.push(this.createPlayer('Cristiano', 'Ronaldo', 'Striker', 'Real Madrid'));
        players.push(this.createPlayer('Karmi', 'Benzema', 'Striker', 'Real Madrid'));
        players.push(this.createPlayer('Sergio', 'Ramos', 'Defender', 'Real Madrid'));
        players.push(this.createPlayer('Gareth', 'Bale', 'Striker', 'Real Madrid'));
        players.push(this.createPlayer('Luca', 'Modric', 'Midfielder', 'Real Madrid'));
        return players;
    }

    private createPlayer(firstname: string, lastname: string, position: string, club: string) {
        return {firstname, lastname, position, club};
    }

    private initUserForm() {
        this.userform = this.fb.group({
            'firstname': new FormControl('', Validators.required),
            'lastname': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            'description': new FormControl(''),
            'gender': new FormControl('', Validators.required)
        });
        this.genders = [];
        this.genders.push({label: 'Select Gender', value: ''});
        this.genders.push({label: 'Male', value: 'Male'});
        this.genders.push({label: 'Female', value: 'Female'});
    }

    public onSubmit(formValue): void {
        console.log('You submitted', formValue);
    }

    public showSuccess(): void {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'PrimeNG rocks'});
    }

    public showInfo(): void {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
    }

    public showWarn(): void {
        this.msgs = [];
        this.msgs.push({severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
    }

    public showError(): void {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error Message', detail: 'Validation failed'});
    }

    public showMultiple(): void {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks'});
        this.msgs.push({severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks'});
        this.msgs.push({severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks'});
    }

    public clear(): void {
        this.msgs = [];
    }

    public openConfirmDialog() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
            },
            reject: () => {
                this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
            }
        });
    }

    private createMenuItems(): Array<MenuItem> {
        return [
            {
                label: 'File',
                icon: 'fa-file-o',
                items: [{
                    label: 'New',
                    icon: 'fa-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                    {label: 'Open'},
                    {separator: true},
                    {label: 'Quit'}
                ]
            }
            , {
                label: 'Edit'
                ,
                icon: 'fa-edit'
                ,
                items: [
                    {label: 'Undo', icon: 'fa-mail-forward'},
                    {label: 'Redo', icon: 'fa-mail-reply'}
                ]
            }

            ,
            {
                label: 'Help',
                icon:
                    'fa-question',
                items:
                    [
                        {
                            label: 'Contents'
                        },
                        {
                            label: 'Search',
                            icon: 'fa-search',
                            items: [
                                {
                                    label: 'Text',
                                    items: [
                                        {
                                            label: 'Workspace'
                                        }
                                    ]
                                },
                                {
                                    label: 'File'
                                }
                            ]
                        }
                    ]
            }
            ,
            {
                label: 'Actions',
                icon:
                    'fa-gear',
                items:
                    [
                        {
                            label: 'Edit',
                            icon: 'fa-refresh',
                            items: [
                                {label: 'Save', icon: 'fa-save'},
                                {label: 'Update', icon: 'fa-save'},
                            ]
                        },
                        {
                            label: 'Other',
                            icon: 'fa-phone',
                            items: [
                                {label: 'Delete', icon: 'fa-minus'}
                            ]
                        }
                    ]
            }
            ,
            {
                label: 'Quit', icon:
                'fa-minus'
            }
        ]
            ;
    }
}
