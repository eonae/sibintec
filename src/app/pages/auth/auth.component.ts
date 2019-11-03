import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationError } from 'src/app/utils/utils';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @Output() login: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('submitBtn') submitBtn: ElementRef;
  public loginForm: FormGroup;
  private sub: Subscription;

  constructor(
    private api: ApiService
  ) { }

  validationError(input: string): ValidationError {

    const control = this.loginForm.get(input);
    const exists = control.invalid && control.touched;

    // Posible only with single 'required' validator and 2 field
    const message = (input === 'phone')
      ? 'Please enter valid phone number'
      : 'Please enter password';

    return { exists, message };
  }

  submit() {
    this.submitBtn.nativeElement.focus();
    if (this.loginForm.valid) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.api.tryLogin(this.loginForm.value)
        .subscribe(
          response => {
            if (response.success) {
              this.login.emit();
            } else {
              this.handleError(response.error);
            }
          },
          this.handleError
        );
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      phone: new FormControl('', [ Validators.required, Validators.minLength(10)]),
      password: new FormControl('', [ Validators.required])
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  handleError(error: any) {
    this.loginForm.reset();
    this.submitBtn.nativeElement.focus();
    alert(error);
  }
}
