import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() status: boolean;

  getMessage() {
    return this.status
      ? 'Operation confirmed'
      : 'Operation canceled!';
  }

  constructor() { }

  ngOnInit() {
  }

}
