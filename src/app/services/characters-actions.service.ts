import { Injectable } from '@angular/core';
import { Character } from '../interfaces/explorer.interface';
import { BoardBox } from '../enum/board-box.enum';

@Injectable({
  providedIn: 'root',
})
export class CharactersActionsService {
  characters: any;
  board: BoardBox[][] = []; 
  constructor() {}

  healCharacter(character: Character | undefined): void {
    if (character) {
      character.hp = Math.min(100, character.hp + 50);
    }
  }

  repairArmourCharacter(character: Character | undefined): void {
    if (character) {
      character.armour = Math.min(100, character.armour + 50);
    }
  }

  reduceCharacterLife(
    character: Character | undefined,
    hpReduction: number
  ): void {
    if (character) {
      character.hp = Math.max(0, character.hp - hpReduction);
    }
  }

  reduceCharacterLifeAndArmour(
    character: Character | undefined,
    hpReduction: number,
    armourReduction: number
  ): void {
    if (character) {
      character.hp = Math.max(0, character.hp - hpReduction);
      character.armour = Math.max(0, character.armour - armourReduction);
    }
  }

  handleExplorerHealCheckbox(selectedOption: string, currentPlayer: string, characters: any[], areCharactersOnSamePosition: Function, charactersActions: any, changePlayerTurn: Function): void {
    if (selectedOption === 'Heal' && currentPlayer === 'doctor') {
      const explorer = characters.find((character: any) => character.type === 'explorer');
      const doctor = characters.find((character: any) => character.type === 'doctor');
      if (explorer && areCharactersOnSamePosition(doctor, explorer)) {
        charactersActions.healCharacter(explorer);
      }
      setTimeout(() => {
        changePlayerTurn();
      }, 500);
    }
  }

  handleExplorerRepairCheckbox(selectedOption: string, currentPlayer: string, characters: any[], areCharactersOnSamePosition: Function, charactersActions: any, changePlayerTurn: Function): void {
    if (selectedOption === 'Repair' && currentPlayer === 'engineer') {
      const explorer = characters.find((character: any) => character.type === 'explorer');
      const engineer = characters.find((character: any) => character.type === 'engineer');
      if (engineer && areCharactersOnSamePosition(engineer, explorer)) {
        charactersActions.repairArmourCharacter(explorer);
      }
      setTimeout(() => {
        changePlayerTurn();
      }, 500);
    }
  }

  handleDoctorCheckbox(selectedOption: string, currentPlayer: string, characters: any[], areCharactersOnSamePosition: Function, charactersActions: any, changePlayerTurn: Function): void {
    if (selectedOption === 'Repair' && currentPlayer === 'engineer') {
      const engineer = characters.find((character: any) => character.type === 'engineer');
      const doctor = characters.find((character: any) => character.type === 'doctor');
      if (engineer && areCharactersOnSamePosition(doctor, engineer)) {
        charactersActions.repairArmourCharacter(doctor);
      }
      setTimeout(() => {
        changePlayerTurn();
      }, 500);
    }
  }

  handleEngineerCheckbox(selectedOption: string, currentPlayer: string, characters: any[], areCharactersOnSamePosition: Function, charactersActions: any, changePlayerTurn: Function): void {
    if (selectedOption === 'Heal' && currentPlayer === 'doctor') {
      const engineer = characters.find((character: any) => character.type === 'engineer');
      const doctor = characters.find((character: any) => character.type === 'doctor');
      if (engineer && areCharactersOnSamePosition(doctor, engineer)) {
        charactersActions.healCharacter(engineer);
      }
      setTimeout(() => {
        changePlayerTurn();
      }, 500);
    }
  }

  characterPositionUpdate(
    character: Character,
    row: number,
    col: number
  ): void {
    character.position = { row, col };
  }

}
