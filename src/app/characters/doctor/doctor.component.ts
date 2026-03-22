import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements AfterViewInit {
  doctorForm: FormGroup;
  isNameInvalid: boolean = false;
  errorMessage: string = '';
  isLeftArrowDisabled = true;

  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private charactersService: CharactersService
  ) {
    this.doctorForm = this.fb.group({
      doctorName: ['', [Validators.required, this.customNameValidator]]
    });

    this.charactersService.getDoctorObservable().subscribe((doctor) => {
      if (doctor) {
        this.isLeftArrowDisabled = false;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const el = this.nameInput?.nativeElement;
      if (!el) return;
      el.focus();
      const len = el.value?.length ?? 0;
      el.setSelectionRange(len, len);
    }, 0);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onEnterKeyPress();
    }
  }

  onEnterKeyPress() {
    const doctorNameControl = this.doctorForm.get('doctorName');
    if (doctorNameControl) {
      if (doctorNameControl.valid) {
        const inputVal = doctorNameControl.value;
        this.charactersService.setNameAndCharacter('doctor', inputVal, '👩‍⚕️');
        this.router.navigate(['choose-engineer']);
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

  moveToEngineerStep() {
    const doctorNameControl = this.doctorForm.get('doctorName');
    if (doctorNameControl) {
      if (doctorNameControl.valid) {
        const inputVal = doctorNameControl.value;
        this.charactersService.setNameAndCharacter('doctor', inputVal, '👩‍⚕️');
        this.router.navigate(['choose-engineer']);
      } else {
        this.isNameInvalid = true;
      }
    }
  }

  moveToExplorer() {
    this.router.navigate(['choose-explorer']);
  }
}
