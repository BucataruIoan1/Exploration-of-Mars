import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Character } from '../interfaces/explorer.interface';
import { BoardBox } from '../enum/board-box.enum';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../services/game.service';
import { DialogService } from '../services/dialog.service';
import { CharactersActionsService } from '../services/characters-actions.service';
import { BoxesService } from '../services/boxes.service';
import { GameUtilsService } from '../services/game-utils.service';
import { DiscoveredBoxes } from '../interfaces/discovered-boxes.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  readonly BoardBox = BoardBox;

  explorer!: Character | undefined;
  doctor!: Character | undefined;
  engineer!: Character | undefined;
  characters: any;
  board: BoardBox[][] = [];
  currentPlayer: string | undefined;
  isOptionSelected: boolean = false;
  showErrorMessage: boolean = false;
  playerTurnEnded: boolean = false;
  selectedOption: string | undefined;
  isColonyDiscovered: boolean = false;
  isDialogClosed: boolean = false;
  discoveredBoxes: DiscoveredBoxes = {stormDust: [], radiation: [], aliens: [], cliffs: [], boss: []};
  eventMessage: { text: string; variant: 'danger' | 'win' } | null = null;
  explorerHealCheckbox: boolean = false;
  engineerHealCheckbox: boolean = false;
  explorerRepairCheckbox: boolean = false;
  doctorRepairCheckbox: boolean = false;
  canExplore = true;
  winning = this.boxesService.winningPosition;
  darthVader = this.boxesService.darthVaderPosition;
  cliff = this.boxesService.cliffPosition;
  aliens = this.boxesService.aliensPosition;
  radiations = this.boxesService.radiationsPositions;
  storms = this.boxesService.stormPositions;

  constructor(
    private charactersService: CharactersService,
    private gameService: GameService,
    public dialogService: DialogService,
    public charactersActions: CharactersActionsService,
    public boxesService: BoxesService,
    public gameUtilsService: GameUtilsService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCharacters();
    this.initializeBoard();
    this.currentPlayer = 'explorer';
    this.startArmourReductionInterval();
    this.boxesService.generateWinningPosition();
    this.boxesService.generateDarthVaderPosition();
    this.boxesService.generateCliffPosition();
    this.boxesService.generateAliensPositions();
    this.boxesService.generateRadiationPositions();
    this.boxesService.generateStormPositions();
  }

  getHeroesAt(row: number, col: number): Character[] {
    return (this.characters ?? []).filter((c: Character | undefined) => {
      if (!c) return false;
      if (this.isCharacterDead(c)) return false;
      return c.position?.row === row && c.position?.col === col;
    });
  }

  getHpValue(character: Character | undefined): number {
    if (!character) return 0;
    return this.isCharacterDead(character) ? 0 : character.hp;
  }

  getArmourValue(character: Character | undefined): number {
    if (!character) return 0;
    return character.armour;
  }

  clampPercent(value: number): number {
    return Math.max(0, Math.min(100, value));
  }

  isExploreMode(): boolean {
    return (
      !this.isColonyDiscovered &&
      this.isOptionSelected &&
      this.selectedOption === 'Explore' &&
      this.canExplore
    );
  }

  isCellActive(row: number, col: number): boolean {
    return this.isExploreMode() && this.isAdjacentPosition(row, col);
  }

  getCellEmoji(row: number, col: number): string | null {
    if (this.board[row]?.[col] !== BoardBox.Explored) return null;

    if (row === this.winning.row && col === this.winning.col) return '🏕️';
    if (row === this.cliff.row && col === this.cliff.col) return '⛰️';
    if (
      (row === this.storms.row1 && col === this.storms.col1) ||
      (row === this.storms.row2 && col === this.storms.col2) ||
      (row === this.storms.row3 && col === this.storms.col3)
    ) {
      return '🌪️';
    }
    if (
      (row === this.radiations.row1 && col === this.radiations.col1) ||
      (row === this.radiations.row2 && col === this.radiations.col2)
    ) {
      return '☢️';
    }
    if (
      (row === this.aliens.row1 && col === this.aliens.col1) ||
      (row === this.aliens.row2 && col === this.aliens.col2)
    ) {
      return '👽';
    }
    if (row === this.darthVader.row && col === this.darthVader.col) return '⚔️';

    return null;
  }

  createCharacters(): void {
    this.explorer = this.charactersService.getExplorer();
    this.doctor = this.charactersService.getDoctor();
    this.engineer = this.charactersService.getEngineer();
    this.characters = [this.explorer, this.doctor, this.engineer];
  }

  initializeBoard(): void {
    this.board = Array.from({ length: 5 }, () =>
      Array(5).fill(BoardBox.Unexplored)
    );

    if (this.explorer && this.doctor && this.engineer) {
      this.board[2][2] = BoardBox.Characters;
      this.charactersActions.characterPositionUpdate(this.explorer, 2, 2);
      this.charactersActions.characterPositionUpdate(this.doctor, 2, 2);
      this.charactersActions.characterPositionUpdate(this.engineer, 2, 2);
      this.isColonyDiscovered = false;
    }
  }

  startArmourReductionInterval(): void {
    setInterval(() => {
      this.characters.forEach((character: any) => {
        if (character.hp > 0 && character.armour === 0) {
          character.hp = Math.max(10, character.hp - 10);
        }
      });
    }, 5000);
  }

  moveCharacter(
    character: Character | undefined,
    row: number,
    col: number
  ): void {
    if (character) {
      this.board[character.position?.row || 0][character.position?.col || 0] =
        BoardBox.Explored;
      this.charactersActions.characterPositionUpdate(character, row, col);
      this.board[row][col] = BoardBox.Explored;
    }
  }

  getErrorMessage(): string {
    if (this.selectedOption === 'Explore') {
      return 'Please select a box which is Up, Down, Left or Right.';
    } else if (this.selectedOption === 'Heal' && !this.canExplore) {
      return 'You can just heal this round.';
    } else if (this.selectedOption === 'Repair' && !this.canExplore) {
      return 'You can just repair armour this round.';
    } 
    else {
      return 'Please first select an action.';
    }
  }

  private setEventMessage(text: string, variant: 'danger' | 'win'): void {
    this.eventMessage = { text, variant };
  }

  private formatTrapMessage(
    character: Character,
    emoji: string,
    title: string,
    hpReduction: number,
    armourReduction: number
  ): string {
    const parts: string[] = [];
    if (hpReduction > 0) parts.push(`-${hpReduction} HP`);
    if (armourReduction > 0) parts.push(`-${armourReduction} Armură`);
    const dmg = parts.length > 0 ? ` (${parts.join(', ')})` : '';
    return `${character.name} a nimerit în capcana ${emoji} ${title}${dmg}.`;
  }

  onBoxClick(row: number, col: number): void {
    if (this.isColonyDiscovered || !this.currentPlayer || !this.isOptionSelected) {
        this.showErrorMessage = true;
        return;
    }

    const currentPlayerCharacter = this.getCurrentCharacter();
    const currentPlayerPosition = this.getCurrentCharacterPosition();
    const isAdjacentPosition = (
        (Math.abs(currentPlayerPosition.row - row) === 1 && currentPlayerPosition.col === col) ||
        (Math.abs(currentPlayerPosition.col - col) === 1 && currentPlayerPosition.row === row)
    );
    const isUnexploredOrExplored = this.board[row][col] === BoardBox.Unexplored || this.board[row][col] === BoardBox.Explored;

    if (currentPlayerCharacter && isAdjacentPosition && isUnexploredOrExplored && this.canExplore) {
        this.eventMessage = null;
        this.moveCharacter(currentPlayerCharacter, row, col);
        this.board[row][col] = BoardBox.Explored;

        const boxType = this.boxesService.getBoxType(row, col);
        if (boxType) {
            switch (boxType) {
                case 'STORM-DUST':
                    if (!this.boxesService.isBoxAlreadyDiscovered(row, col, this.discoveredBoxes.stormDust)) {
                      this.boxesService.handleDiscoveredBox(currentPlayerCharacter, this.discoveredBoxes.stormDust, 25, 50, row, col, this.characters);
                      this.setEventMessage(this.formatTrapMessage(currentPlayerCharacter, '🌪️', 'Furtună de nisip', 25, 50), 'danger');
                    }
                    break;
                case 'RADIATION':
                    if (!this.boxesService.isBoxAlreadyDiscovered(row, col, this.discoveredBoxes.radiation)) {
                      this.boxesService.handleDiscoveredBox(currentPlayerCharacter, this.discoveredBoxes.radiation, 0, 70, row, col, this.characters);
                      this.setEventMessage(this.formatTrapMessage(currentPlayerCharacter, '☢️', 'Radiații', 0, 70), 'danger');
                    }
                    break;
                case 'ALIENS':
                    if (!this.boxesService.isBoxAlreadyDiscovered(row, col, this.discoveredBoxes.aliens)) {
                      this.boxesService.handleDiscoveredBox(currentPlayerCharacter, this.discoveredBoxes.aliens, 30, 30, row, col, this.characters);
                      this.setEventMessage(this.formatTrapMessage(currentPlayerCharacter, '👽', 'Extraterestri', 30, 30), 'danger');
                    }
                    break;
                case 'CLIFFS':
                    if (!this.boxesService.isBoxAlreadyDiscovered(row, col, this.discoveredBoxes.cliffs)) {
                      this.boxesService.handleDiscoveredBox(currentPlayerCharacter, this.discoveredBoxes.cliffs, 90, 0, row, col, this.characters);
                      this.setEventMessage(this.formatTrapMessage(currentPlayerCharacter, '⛰️', 'Prăpastie', 90, 0), 'danger');
                    }
                    break;
                case 'BOSS':
                    if (!this.boxesService.isBoxAlreadyDiscovered(row, col, this.discoveredBoxes.boss)) {
                      this.boxesService.handleDiscoveredBox(currentPlayerCharacter, this.discoveredBoxes.boss, 100, 100, row, col, this.characters);
                      this.setEventMessage(this.formatTrapMessage(currentPlayerCharacter, '⚔️', 'Darth Vader', 100, 100), 'danger');
                    }
                    break;
            }
        }

        if (!this.atLeastOneCharacterAlive()) {
            this.gameService.stopGame();
            this.setEventMessage('Toți membrii echipei au murit. Game Over.', 'danger');
        }

        if (row === this.winning.row && col === this.winning.col) {
            this.isColonyDiscovered = true;
            this.setEventMessage(`${currentPlayerCharacter.name} a găsit colonia! YOU WIN!`, 'win');
            this.openColonyDiscoveredDialog();
            this.gameService.stopGame();
        }

        this.changePlayerTurn();
        this.isOptionSelected = false;
        this.showErrorMessage = false;
        this.canExplore = true;
    } else {
        this.showErrorMessage = true;
    }
}

  getCurrentCharacterPosition(): { row: number; col: number } {
    return this.gameUtilsService.getCurrentCharacterPosition(this.currentPlayer, this.explorer, this.doctor, this.engineer);
  }

  getCurrentCharacter(): Character | undefined {
    return this.gameUtilsService.getCurrentCharacter(this.currentPlayer, this.explorer, this.doctor, this.engineer);
  }

  getNextPlayer(currentPlayer: any): any {
    return this.gameUtilsService.getNextPlayer(currentPlayer);
  }

  getAvailableOptions(): string[] {
    return this.gameUtilsService.getAvailableOptions(this.currentPlayer, this.characters, this.isColonyDiscovered, this.areCharactersOnSamePosition.bind(this));
  }

  isAdjacentPosition(row: number, col: number): boolean {
    const currentPlayerPosition = this.getCurrentCharacterPosition();

    return (
      (Math.abs(currentPlayerPosition.row - row) === 1 &&
        currentPlayerPosition.col === col) ||
      (Math.abs(currentPlayerPosition.col - col) === 1 &&
        currentPlayerPosition.row === row)
    );
  }

  areAllCharactersDead(): boolean {
    return this.gameUtilsService.areAllCharactersDead(this.characters);
  }

  atLeastOneCharacterAlive(): boolean {
    return this.gameUtilsService.atLeastOneCharacterAlive(this.characters);
  }

  areCharactersOnSamePosition(character1: Character, character2: Character): boolean {
    return this.gameUtilsService.areCharactersOnSamePosition(character1, character2);
  }

  isLastCharacter(): boolean {
    return this.gameUtilsService.isLastCharacter(this.characters);
  }
  
  isCharacterDead(character: Character | undefined): boolean {
    return this.gameUtilsService.isCharacterDead(character);
  }

  isCurrentCharacterPosition(row: number, col: number): boolean {
    return this.gameUtilsService.isCurrentCharacterPosition(this.currentPlayer, row, col,  this.explorer, this.doctor, this.engineer);
  }

  changePlayerTurn(): void {
    const aliveCharacters = this.characters.filter(
      (character: any) => character.hp > 0
    );
  
    const currentIndex = aliveCharacters.findIndex(
      (character: any) => character.type === this.currentPlayer
    );
  
    let nextIndex = (currentIndex + 1) % aliveCharacters.length;
  
    if (this.currentPlayer === 'doctor' && !this.isCharacterDead(this.engineer)) {
      nextIndex = aliveCharacters.findIndex(
        (character: any) => character.type === 'engineer'
      );
    }
  
    this.currentPlayer = aliveCharacters[nextIndex].type;
    this.selectedOption = undefined;
    this.isOptionSelected = false;
  }

  onOptionSelect(option: string): void {
    if (!this.currentPlayer || this.isOptionSelected) return;

    this.selectedOption = option;
    this.isOptionSelected = true;
    this.showErrorMessage = false;
    this.canExplore = false;

    switch (option) {
        case 'Explore':
            this.canExplore = true;
            break;
        case 'Stay':
            if (['doctor', 'engineer'].includes(this.currentPlayer)) {
                this.changePlayerTurn();
            }
            break;
        case 'Heal':
            if (this.currentPlayer === 'doctor' && (this.engineerHealCheckbox || this.explorerHealCheckbox)) {
                this.charactersActions.healCharacter(this.getCurrentCharacter());
            }
            break;
        case 'Repair':
            if (this.currentPlayer === 'engineer' && (this.explorerRepairCheckbox || this.doctorRepairCheckbox)) {
                this.charactersActions.repairArmourCharacter(this.getCurrentCharacter());
            }
            break;
        default:
            break;
    }
}

  onExplorerCheckboxChange() {
    if (this.currentPlayer) {
      this.charactersActions.handleExplorerHealCheckbox(this.selectedOption ?? '', this.currentPlayer, this.characters,
      this.areCharactersOnSamePosition.bind(this), this.charactersActions, this.changePlayerTurn.bind(this));
    }
    this.engineerHealCheckbox = false;
    this.explorerHealCheckbox = false;
  }

  onExplorerCheckboxChangeRepair() {
    if (this.currentPlayer) {
      this.charactersActions.handleExplorerRepairCheckbox(this.selectedOption ?? '', this.currentPlayer, this.characters,
      this.areCharactersOnSamePosition.bind(this), this.charactersActions, this.changePlayerTurn.bind(this));
    }
    this.explorerRepairCheckbox = false;
    this.doctorRepairCheckbox = false;
  }

  onDoctorCheckboxChange() {
    if (this.currentPlayer) {
      this.charactersActions.handleDoctorCheckbox(this.selectedOption ?? '', this.currentPlayer, this.characters,
      this.areCharactersOnSamePosition.bind(this), this.charactersActions, this.changePlayerTurn.bind(this));
    }
    this.doctorRepairCheckbox = false;
    this.explorerHealCheckbox = false;
  }

  onEngineerCheckboxChange() {
    if (this.currentPlayer) {
      this.charactersActions.handleEngineerCheckbox(this.selectedOption ?? '', this.currentPlayer, this.characters,
      this.areCharactersOnSamePosition.bind(this), this.charactersActions, this.changePlayerTurn.bind(this));
    }
    this.engineerHealCheckbox = false;
    this.explorerHealCheckbox = false;
  }

  openColonyDiscoveredDialog(): void {
    this.dialogService.openColonyDiscoveredDialog();
  }

  public showDangerDialog(
    character: Character | undefined,
    trapType: 'DarthVader' | 'Aliens' | 'Cliffs' | 'Radiation' | 'Storm-Dust'
  ): void {
    if (character) {
      this.dialogService.showDangerDialog(character, trapType);
    }
  }
  
  showGameOverDialog(): void {
    this.dialogService.showGameOverDialog();
  }

  restartGame(): void {
    this.isColonyDiscovered = false;
    this.isDialogClosed = false;
    this.gameService.stopGame();
    this.gameService.setAllowLeaveGame(true);
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
