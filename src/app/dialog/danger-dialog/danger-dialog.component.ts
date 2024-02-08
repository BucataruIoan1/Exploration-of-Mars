import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-danger-dialog',
  templateUrl: './danger-dialog.component.html',
  styleUrls: ['./danger-dialog.component.scss'],
})
export class DangerDialogComponent {
  @Input() trapType: 'DarthVader' | 'Aliens' | 'Cliffs' | 'Radiation' | 'Storm-Dust' = 'Aliens';

  constructor(public dialogRef: MatDialogRef<DangerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.trapType) {
      this.trapType = data.trapType;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
