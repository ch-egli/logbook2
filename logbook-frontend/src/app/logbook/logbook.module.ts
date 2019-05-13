import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    AccordionModule,
    BreadcrumbModule,
    ButtonModule, CalendarModule, CheckboxModule, ConfirmationService, ConfirmDialogModule,
    DataTableModule,
    DropdownModule,
    FieldsetModule,
    GrowlModule,
    InputMaskModule, InputSwitchModule, InputTextModule, ListboxModule, MenubarModule,
    MessagesModule, MultiSelectModule, PaginatorModule,
    PanelModule, ProgressBarModule,
    RadioButtonModule,
    SelectButtonModule,
    SharedModule, SliderModule, SpinnerModule,
    SplitButtonModule, StepsModule, TabViewModule,
    ToggleButtonModule, TabMenuModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { AboutComponent } from './about/about.component';
import { ThemeComponent } from './theme/theme.component';
import { HomeComponent } from './home/home.component';
import { ChartsComponent } from './charts/charts.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        ThemeComponent,
        ChartsComponent
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
        DataTableModule,
        SharedModule,
        MessagesModule,
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
        TableModule
    ],
    providers: [ConfirmationService]
})
export class LogbookModule {
}
