import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    AccordionModule,
    BreadcrumbModule,
    ButtonModule, CalendarModule, CheckboxModule, ConfirmationService, ConfirmDialogModule,
    DropdownModule,
    FieldsetModule,
    GrowlModule,
    InputMaskModule, InputSwitchModule, InputTextModule, ListboxModule, MenubarModule,
    MessagesModule, MessageModule, MultiSelectModule, PaginatorModule,
    PanelModule, ProgressBarModule,
    RadioButtonModule,
    SelectButtonModule,
    SharedModule, SliderModule, SpinnerModule,
    SplitButtonModule, StepsModule, TabViewModule,
    ToggleButtonModule, TabMenuModule
} from 'primeng/primeng';
import { RatingModule } from 'primeng/rating';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { WorkoutComponent } from './workout/workout.component';
import { StatusComponent } from './status/status.component';
import { ChartsComponent } from './charts/charts.component';
import { Charts2Component } from './charts/charts2.component';
import { ExportComponent } from './export/export.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './login/password.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        HomeComponent,
        WorkoutComponent,
        StatusComponent,
        AboutComponent,
        ChartsComponent,
        Charts2Component,
        ExportComponent,
        LoginComponent,
        PasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BreadcrumbModule,
        ButtonModule,
        SplitButtonModule,
        RadioButtonModule,
        ToggleButtonModule,
        SelectButtonModule,
        InputMaskModule,
        DropdownModule,
        AccordionModule,
        FieldsetModule,
        SharedModule,
        MessagesModule,
        MessageModule,
        GrowlModule,
        PanelModule,
        CheckboxModule,
        CalendarModule,
        InputSwitchModule,
        SpinnerModule,
        InputTextModule,
        ListboxModule,
        MultiSelectModule,
        SliderModule,
        PaginatorModule,
        TabViewModule,
        ConfirmDialogModule,
        StepsModule,
        MenubarModule,
        ProgressBarModule,
        ChartsModule,
        TabMenuModule,
        TableModule,
        OverlayPanelModule,
        RatingModule
    ],
    providers: [ConfirmationService]
})
export class LogbookModule {
}
