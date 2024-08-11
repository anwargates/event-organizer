import {Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-confirmation-dialog',
    templateUrl: './delete-confirmation-dialog.component.html',
    styleUrl: './delete-confirmation-dialog.component.scss'
})
export class DeleteConfirmationDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
    ) {}

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}
