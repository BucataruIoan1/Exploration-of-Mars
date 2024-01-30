import { Component, EventEmitter, Output } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-colony-discovered-dialog',
  templateUrl: './colony-discovered-dialog.component.html',
  styleUrls: ['./colony-discovered-dialog.component.scss'],
})
export class ColonyDiscoveredDialogComponent {
  @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public dialogRef: DialogRef) {}

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}
