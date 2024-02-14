import { Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { Character } from '../interfaces/explorer.interface';
import { CharactersActionsService } from './characters-actions.service';
import { GameUtilsService } from './game-utils.service';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  constructor(public dialogService: DialogService, public charactersActions: CharactersActionsService, public gameUtils: GameUtilsService) { }
  winningPosition: { row: number, col: number } = { row: 0, col: 0 };
  darthVaderPosition: { row: number, col: number } = { row: 0, col: 0 };
  cliffPosition: { row: number, col: number } = { row: 0, col: 0 };
  aliensPosition: { row1: number, col1: number, row2: number, col2: number } = { row1: 0, col1: 0, row2: 0, col2: 0 };
  radiationsPositions: { row1: number, col1: number, row2: number, col2: number } = { row1: 0, col1: 0, row2: 0, col2: 0 };
  stormPositions: { row1: number, col1: number, row2: number, col2: number, row3: number, col3: number } = { row1: 0, col1: 0, row2: 0, col2: 0, row3: 0, col3: 0 };

  public generateWinningPosition(): {row: number, col: number} {
    let row = Math.floor(Math.random() * 5);
    let col = Math.floor(Math.random() * 5);
    while (row === 2 && col === 2) {
      row = Math.floor(Math.random() * 6);
      col = Math.floor(Math.random() * 6);
    }
    this.winningPosition.row = row;
    this.winningPosition.col = col;
    return { row, col };
  }

  public generateDarthVaderPosition(): { row: number, col: number } {
    let row = Math.floor(Math.random() * 5);
    let col = Math.floor(Math.random() * 5);
    while (row === 2 && col === 2 || row === this.winningPosition.row && col === this.winningPosition.col) {
      row = Math.floor(Math.random() * 6);
      col = Math.floor(Math.random() * 6);
    }
    this.darthVaderPosition.row = row;
    this.darthVaderPosition.col = col;
    return { row, col };
  }

  public generateCliffPosition(): {row: number, col: number} {
    let row = Math.floor(Math.random() * 5);
    let col = Math.floor(Math.random() * 5);
    while ((row === 2 && col === 2) || (row === this.darthVaderPosition.row && col === this.darthVaderPosition.col) || (row === this.winningPosition.row && col === this.winningPosition.col)) {
      row = Math.floor(Math.random() * 5);
      col = Math.floor(Math.random() * 5);
    }
    this.cliffPosition.row = row;
    this.cliffPosition.col = col;
    return { row, col };
  }

  public generateAliensPositions(): { row1: number, col1: number, row2: number, col2: number } {
    let row1 = Math.floor(Math.random() * 5);
    let col1 = Math.floor(Math.random() * 5);
    let row2 = Math.floor(Math.random() * 5);
    let col2 = Math.floor(Math.random() * 5);
    while (
      (row1 === 2 && col1 === 2) || 
      (row1 === this.darthVaderPosition.row && col1 === this.darthVaderPosition.col) ||
      (row1 === this.cliffPosition.row && col1 === this.cliffPosition.col) ||
      (row1 === this.winningPosition.row && col1 === this.winningPosition.col)
      ) {
      row1 = Math.floor(Math.random() * 5);
      col1 = Math.floor(Math.random() * 5);
    }
    while (
      (row2 === 2 && col2 === 2) || 
      (row2 === this.darthVaderPosition.row && col2 === this.darthVaderPosition.col) ||
      (row2 === this.cliffPosition.row && col2 === this.cliffPosition.col) ||
      (row2 === row1 && col2 === col1) ||
      (row2 === this.winningPosition.row && col2 === this.winningPosition.col)
      ) {
      row2 = Math.floor(Math.random() * 5);
      col2 = Math.floor(Math.random() * 5);
    }
    this.aliensPosition.row1 = row1;
    this.aliensPosition.col1 = col1;
    this.aliensPosition.row2 = row2;
    this.aliensPosition.col2 = col2;
    return {row1, col1, row2, col2}
}

public generateRadiationPositions(): { row1: number, col1: number, row2: number, col2: number } {
    let row1 = Math.floor(Math.random() * 5);
    let col1 = Math.floor(Math.random() * 5);
    let row2 = Math.floor(Math.random() * 5);
    let col2 = Math.floor(Math.random() * 5);
    while (
      (row1 === 2 && col1 === 2) || 
      (row1 === this.darthVaderPosition.row && col1 === this.darthVaderPosition.col) ||
      (row1 === this.cliffPosition.row && col1 === this.cliffPosition.col) ||
      (row1 === this.aliensPosition.row1 && col1 === this.aliensPosition.col1) ||
      (row1 === this.aliensPosition.row2 && col1 === this.aliensPosition.col2) ||
      (row1 === this.winningPosition.row && col1 === this.winningPosition.col)
      ) {
      row1 = Math.floor(Math.random() * 5);
      col1 = Math.floor(Math.random() * 5);
    }
    while (
      (row2 === 2 && col2 === 2) || 
      (row2 === this.darthVaderPosition.row && col2 === this.darthVaderPosition.col) ||
      (row2 === this.cliffPosition.row && col2 === this.cliffPosition.col) ||
      (row2 === this.aliensPosition.row1 && col2 === this.aliensPosition.col1) ||
      (row2 === this.aliensPosition.row2 && col2 === this.aliensPosition.col2) ||
      (row2 === row1 && col2 === col1) ||
      (row2 === this.winningPosition.row && col2 === this.winningPosition.col)
      ) {
      row2 = Math.floor(Math.random() * 5);
      col2 = Math.floor(Math.random() * 5);
    }
    this.radiationsPositions.row1 = row1;
    this.radiationsPositions.col1 = col1;
    this.radiationsPositions.row2 = row2;
    this.radiationsPositions.col2 = col2;
    return {row1, col1, row2, col2}
}

public generateStormPositions(): { row1: number, col1: number, row2: number, col2: number, row3: number, col3: number } {
  let row1 = Math.floor(Math.random() * 5);
  let col1 = Math.floor(Math.random() * 5);
  let row2 = Math.floor(Math.random() * 5);
  let col2 = Math.floor(Math.random() * 5);
  let row3 = Math.floor(Math.random() * 5);
  let col3 = Math.floor(Math.random() * 5);
  while (
    (row1 === 2 && col1 === 2) || 
    (row1 === this.darthVaderPosition.row && col1 === this.darthVaderPosition.col) ||
    (row1 === this.cliffPosition.row && col1 === this.cliffPosition.col) ||
    (row1 === this.aliensPosition.row1 && col1 === this.aliensPosition.col1) ||
    (row1 === this.aliensPosition.row2 && col1 === this.aliensPosition.col2) ||
    (row1 === this.radiationsPositions.row1 && col1 === this.radiationsPositions.col1) ||
    (row1 === this.radiationsPositions.row2 && col1 === this.radiationsPositions.col2) ||
    (row1 === this.winningPosition.row && col1 === this.winningPosition.col)
    ) {
    row1 = Math.floor(Math.random() * 5);
    col1 = Math.floor(Math.random() * 5);
  }
  while (
    (row2 === 2 && col2 === 2) || 
    (row2 === this.darthVaderPosition.row && col2 === this.darthVaderPosition.col) ||
    (row2 === this.cliffPosition.row && col2 === this.cliffPosition.col) ||
    (row2 === this.aliensPosition.row1 && col2 === this.aliensPosition.col1) ||
    (row2 === this.aliensPosition.row2 && col2 === this.aliensPosition.col2) ||
    (row2 === this.radiationsPositions.row1 && col2 === this.radiationsPositions.col1) ||
    (row2 === this.radiationsPositions.row2 && col2 === this.radiationsPositions.col2) ||
    (row2 === row1 && col2 === col1) ||
    (row2 === this.winningPosition.row && col2 === this.winningPosition.col)
    ) {
    row2 = Math.floor(Math.random() * 5);
    col2 = Math.floor(Math.random() * 5);
  }
  while (
    (row3 === 2 && col3 === 2) || 
    (row3 === this.darthVaderPosition.row && col3 === this.darthVaderPosition.col) ||
    (row3 === this.cliffPosition.row && col3 === this.cliffPosition.col) ||
    (row3 === this.aliensPosition.row1 && col3 === this.aliensPosition.col1) ||
    (row3 === this.aliensPosition.row2 && col3 === this.aliensPosition.col2) ||
    (row3 === this.radiationsPositions.row1 && col3 === this.radiationsPositions.col1) ||
    (row3 === this.radiationsPositions.row2 && col3 === this.radiationsPositions.col2) ||
    (row3 === row1 && col3 === col1) ||
    (row3 === row2 && col3 === col2) ||
    (row3 === this.winningPosition.row && col3 === this.winningPosition.col)
    ) {
    row3 = Math.floor(Math.random() * 5);
    col3 = Math.floor(Math.random() * 5);
  }
  this.stormPositions.row1 = row1;
  this.stormPositions.col1 = col1;
  this.stormPositions.row2 = row2;
  this.stormPositions.col2 = col2;
  this.stormPositions.row3 = row3;
  this.stormPositions.col3 = col3;
  return {row1, col1, row2, col2, row3, col3}
}
  public isDarthVaderBox(row: number, col: number): boolean {
    return row === this.darthVaderPosition.row && col === this.darthVaderPosition.col;
  }

  public isCliffsBox(row: number, col: number): boolean {
    return row === this.cliffPosition.row && col === this.cliffPosition.col;
  }

  public isAliensBox(row: number, col: number): boolean {
    return (row === this.aliensPosition.row1 && col === this.aliensPosition.col1) || (row === this.aliensPosition.row2 && col === this.aliensPosition.col2);
  }

  public isRadiationBox(row: number, col: number): boolean {
    return (row === this.radiationsPositions.row1 && col === this.radiationsPositions.col1) || (row === this.radiationsPositions.row2 && col === this.radiationsPositions.col2);
  }

  public isStormDustBox(row: number, col: number): boolean {
    return (
      (row === this.stormPositions.row1 && col === this.stormPositions.col1) ||
      (row === this.stormPositions.row2 && col === this.stormPositions.col2) ||
      (row === this.stormPositions.row3 && col === this.stormPositions.col3)
    );
  }

  public handleDiscoveredBox(
    character: Character | undefined,
    discoveredBoxes: { row: number; col: number }[],
    hpReduction: number,
    armourReduction: number,
    row: number,
    col: number,
    characters: Character[]
): void {
    if (!this.isBoxAlreadyDiscovered(row, col, discoveredBoxes)) {
        if (armourReduction) {
            this.charactersActions.reduceCharacterLifeAndArmour(
                character,
                hpReduction,
                armourReduction
            );
        } else {
            this.charactersActions.reduceCharacterLife(character, hpReduction);
        }
        discoveredBoxes.push({ row, col });

        !this.gameUtils.areAllCharactersDead(characters) &&
            (this.isDarthVaderBox(row, col) ? this.dialogService.showDangerDialog(character, 'DarthVader') :
            (this.isAliensBox(row, col) ? this.dialogService.showDangerDialog(character, 'Aliens') :
            (this.isCliffsBox(row, col) ? this.dialogService.showDangerDialog(character, 'Cliffs') :
            (this.isRadiationBox(row, col) ? this.dialogService.showDangerDialog(character, 'Radiation') :
            (this.isStormDustBox(row, col) && this.dialogService.showDangerDialog(character, 'Storm-Dust'))))));

        this.gameUtils.areAllCharactersDead(characters) && this.dialogService.showGameOverDialog();
    }
}

getBoxType(row: number, col: number): string | null {
  if (
    (row === this.stormPositions.row1 && col === this.stormPositions.col1) ||
    (row === this.stormPositions.row2 && col === this.stormPositions.col2) ||
    (row === this.stormPositions.row3 && col === this.stormPositions.col3)
  ) {
    return 'STORM-DUST';
  } else if ((row === this.radiationsPositions.row1 && col === this.radiationsPositions.col1) || (row === this.radiationsPositions.row2 && col === this.radiationsPositions.col2)) {
    return 'RADIATION';
  } else if ((row === this.aliensPosition.row1 && col === this.aliensPosition.col1) || (row === this.aliensPosition.row2 && col === this.aliensPosition.col2)) {
    return 'ALIENS';
  } else if (row === this.cliffPosition.row && col === this.cliffPosition.col) {
    return 'CLIFFS';
  } else if (row === this.darthVaderPosition.row && col === this.darthVaderPosition.col) {
    return 'BOSS';
  }

  return null;
}

isPositionOccupied(position: { row: number; col: number }, trapPositions: { row: number; col: number }[]): boolean {
  return trapPositions.some(trap => trap.row === position.row && trap.col === position.col);
}

  public isBoxAlreadyDiscovered(
    row: number,
    col: number,
    discoveredBoxes: { row: number; col: number }[]
  ): boolean {
    return discoveredBoxes.some((box) => box.row === row && box.col === col);
  }

}