import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  @Output() action: EventEmitter<boolean> = new EventEmitter<boolean>();

  public balance: number;
  public total: number;

  private sub: Subscription;

  constructor(
    private api: ApiService
  ) { }

  confirm() {
    this.action.emit(true);
  }

  cancel() {
    this.action.emit(false);
  }

  ngOnInit() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.api.getPaymentDetails()
      .subscribe(
        response => {
          if (!response.success) {
            this.handleError(response.error);
          } else {
            console.log(response.data);
            this.balance = response.data.balance;
            this.total = response.data.total;
          }
        },
        this.handleError
      );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  handleError(error: any) {
    alert('And error occured. Try again later');
    console.log(error);
  }
}
