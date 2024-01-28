import { Component, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.scss']
})
export class EngineerComponent {
  engineerForm: FormGroup;
  isNameInvalid: boolean = false;
  errorMessage: string = '';
  isLeftArrowDisabled = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private charactersService: CharactersService
  ) {
    this.engineerForm = this.fb.group({
      engineerName: ['', [Validators.required, this.customNameValidator]]
    });

    this.charactersService.getEngineerObservable().subscribe((engineer) => {
      if (engineer) {
        this.isLeftArrowDisabled = false;
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onEnterKeyPress();
    }
  }

  onEnterKeyPress() {
    const engineerNameControl = this.engineerForm.get('engineerName');
    if (engineerNameControl) {
      if (engineerNameControl.valid) {
        const inputVal = engineerNameControl.value;
        this.charactersService.setNameAndCharacter('engineer', inputVal, '👨‍🔧');
        this.router.navigate(['game']);
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

  moveToGame() {
    const engineerNameControl = this.engineerForm.get('engineerName');
    if (engineerNameControl) {
      if (engineerNameControl.valid) {
        const inputVal = engineerNameControl.value;
        this.charactersService.setNameAndCharacter('engineer', inputVal, '👨‍🔧');
        this.router.navigate(['game']);
      } else {
        this.isNameInvalid = true;
      }
    }
  }

  moveToDoctor() {
    this.router.navigate(['choose-doctor']);
  }
}
