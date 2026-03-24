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
    if (!this.canProceed) return;
    const inputVal = `${this.doctorForm.get('doctorName')?.value ?? ''}`.trim();
    this.charactersService.setNameAndCharacter('doctor', inputVal, '🧑‍⚕️');
    this.router.navigate(['choose-engineer']);
  }

  customNameValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = `${control.value ?? ''}`;
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      return { invalidName: true };
    }

    return null;
  };

  get canProceed(): boolean {
    const value = `${this.doctorForm.get('doctorName')?.value ?? ''}`;
    return value.trim().length > 0;
  }

  moveToEngineerStep() {
    if (!this.canProceed) return;
    const inputVal = `${this.doctorForm.get('doctorName')?.value ?? ''}`.trim();
    this.charactersService.setNameAndCharacter('doctor', inputVal, '🧑‍⚕️');
    this.router.navigate(['choose-engineer']);
  }

  moveToExplorer() {
    this.router.navigate(['choose-explorer']);
  }
}
