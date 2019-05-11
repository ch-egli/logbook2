/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Unit-Tests HomeComponent
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 26.04.2017, 2017.
 */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('has a name property [title]', () => {
        expect(component.title).toBe('ESTA WebJS 2');
    });

    it('has a name property [subtitle]', () => {
        expect(component.subtitle).toBe('Starterkit mit Angular');
    });

    it('has a name property [welcomeMessage]', () => {
        expect(component.welcomeMessage).toBe('Herzlich Willkommen');
    });
});
