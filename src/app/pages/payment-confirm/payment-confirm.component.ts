import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrl: './payment-confirm.component.scss'
})
export class PaymentConfirmComponent implements OnInit {
  isSuccess: boolean = false;
  transactionNumber: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const state = history.state;
    this.isSuccess = state.isSuccess;
    this.transactionNumber = state.transactionNumber;
  }
}
