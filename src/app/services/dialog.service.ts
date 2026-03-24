import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Character } from '../interfaces/explorer.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}
  public isDialogClosed: boolean = false;

  openColonyDiscoveredDialog(): void {
    this.isDialogClosed = true;
    return;
  }
  
  showDangerDialog(
    _character: Character | undefined,
    _trapType: 'DarthVader' | 'Aliens' | 'Cliffs' | 'Radiation' | 'Storm-Dust'
  ): void {
    return;
  }

  showGameOverDialog(): void {
    this.isDialogClosed = true;
    return;
  }
}
