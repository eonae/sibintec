import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  stage: number;
  paymentConfirmed: boolean;

  constructor() { }

  goToConfirm() {
    this.stage = 1;
  }

  goToStatus(status: boolean) {
    this.paymentConfirmed = status;
    this.stage = 2;
  }

  ngOnInit() {
    this.stage = 0;
  }
}
