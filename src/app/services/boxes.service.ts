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

  public isDarthVaderBox(row: number, col: number): boolean {
    return row === 4 && col === 2;
  }

  public isAliensBox(row: number, col: number): boolean {
    return (row === 1 && col === 2) || (row === 2 && col === 1);
  }

  public isCliffsBox(row: number, col: number): boolean {
    return row === 0 && col === 2;
  }

  public isRadiationBox(row: number, col: number): boolean {
    return (row === 3 && col === 1) || (row === 1 && col === 3);
  }

  public isStormDustBox(row: number, col: number): boolean {
    return (
      (row === 0 && col === 0) ||
      (row === 2 && col === 3) ||
      (row === 4 && col === 4)
    );
  }

  public handleDiscoveredBox(
    character: Character | undefined,
    discoveredBoxes: { row: number; col: number }[],
    hpReduction: number,
    armourReduction: number,
    row: number,
    col: number,
    characters: Character[] // Adăugăm argumentul lipsă
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

  public isBoxAlreadyDiscovered(
    row: number,
    col: number,
    discoveredBoxes: { row: number; col: number }[]
  ): boolean {
    return discoveredBoxes.some((box) => box.row === row && box.col === col);
  }

}
