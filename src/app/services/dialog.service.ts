import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColonyDiscoveredDialogComponent } from '../dialog/colony-discovered-dialog/colony-discovered-dialog.component';
import { DangerDialogComponent } from '../dialog/danger-dialog/danger-dialog.component';
import { GameOverDialogComponent } from '../dialog/game-over-dialog/game-over-dialog.component';
import { Character } from '../interfaces/explorer.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}
  public isDialogClosed: boolean = false;

  openColonyDiscoveredDialog(): void {
    const dialogRef = this.dialog.open(ColonyDiscoveredDialogComponent, {
      height: '400px',
      width: '850px',
    });
  
    dialogRef.afterClosed().subscribe((value: boolean) => {
      this.isDialogClosed = true;
    });
  }
  
  showDangerDialog(
    character: Character | undefined,
    trapType: 'DarthVader' | 'Aliens' | 'Cliffs' | 'Radiation' | 'Storm-Dust'
  ): void {
    if (character) {
      const dialogRef = this.dialog.open(DangerDialogComponent, {
        height: '400px',
        width: '850px',
        data: { characterType: character.type, trapType: trapType },
      });
    }
  }

  showGameOverDialog(): void {
    const dialogRef = this.dialog.open(GameOverDialogComponent, {
      height: '400px',
      width: '850px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isDialogClosed = true;
    });
  }
}
