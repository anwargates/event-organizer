import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-proof-dialog-component',
  templateUrl: './order-proof-dialog-component.component.html',
  styleUrl: './order-proof-dialog-component.component.scss'
})
export class OrderProofDialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderProofDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { buktiPesanan: string }) {}


  onClose(): void {
    this.dialogRef.close();
  }
}
