import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title: string;
  welcomeMessage: string;

  constructor() {
    this.title = 'Climbing Logbook 2';
    this.welcomeMessage = 'Herzlich Willkommen';
  }

  ngOnInit() {
  }
}
