import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent {
  explorerForm: FormGroup;
  isNameInvalid: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private charactersService: CharactersService,
    private gameService: GameService,
  ) {
    this.explorerForm = this.fb.group({
      explorerName: ['', [Validators.required, this.customNameValidator]]
    });

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onEnterKeyPress();
    }
  }

  onEnterKeyPress() {
    const explorerNameControl = this.explorerForm.get('explorerName');
    if (explorerNameControl) {
      if (explorerNameControl.valid) {
        const inputVal = explorerNameControl.value;
        this.charactersService.setNameAndCharacter('explorer', inputVal, '👨‍🚀');
        this.router.navigate(['choose-doctor']);
      } else {
        this.isNameInvalid = true;
      }
    }
  }

  customNameValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    const hasMinLength = value.length >= 3;
    const hasDigit = /\d/.test(value);
    const containsOnlyDigits = /^\d+$/.test(value);
    const containsAtLeastThreeLetters = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(value);

    this.errorMessage =
      !hasMinLength && !hasDigit
        ? 'Please enter a name that has at least 3 characters and 1 digit.'
        : !hasMinLength
        ? 'Please enter a name that has at least 3 characters.'
        : !containsAtLeastThreeLetters
        ? 'Please enter a name that contains at least 3 letters.'
        : !hasDigit
        ? 'Please enter a name that has at least 1 digit.'
        : '';

    if (hasMinLength && hasDigit && containsAtLeastThreeLetters && !containsOnlyDigits) {
      this.isNameInvalid = false;
      this.errorMessage = '';
      return null;
    }

    return { 'invalidName': true };
  };

  moveToMainPage(): void {
    this.gameService.stopGame();
    this.router.navigate(['/']);
  }

  moveToDoctorStep() {
    const explorerNameControl = this.explorerForm.get('explorerName');
    if (explorerNameControl) {
      if (explorerNameControl.valid) {
        const inputVal = explorerNameControl.value;
        this.charactersService.setNameAndCharacter('explorer', inputVal, '👨‍🚀');
        this.router.navigate(['choose-doctor']);
      } else {
        this.isNameInvalid = true;
      }
    }
  }
}
