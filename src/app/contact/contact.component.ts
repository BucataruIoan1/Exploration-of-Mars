import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  serviceId: string = "service_tp8yl9g";
  templateId: string = "template_fqbeafu";
  userId: string = "7euEA5nSPy3FrFWVV";
  emailRegex: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
  isFormValid: boolean | undefined = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gameService: GameService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.contactForm?.get('name')?.valueChanges.subscribe(() => this.validateForm());
    this.contactForm?.get('email')?.valueChanges.subscribe(() => this.validateForm());
  }

  moveToMainPage(): void {
    this.gameService.stopGame();
    this.router.navigate(['/']);
  }

  validateForm(): void {
    this.isFormValid = this.contactForm?.get('name')?.valid && this.contactForm?.get('email')?.valid;
  }

  submitForm() {
    if (this.contactForm.valid) {
      const templateParams = this.contactForm.value;

      emailjs.send(this.serviceId, this.templateId, templateParams, this.userId)
        .then((response: EmailJSResponseStatus) => {
          console.log('Email sent successfully:', response);
        }, (error) => {
          console.error('Error sending email:', error);
        });
        this.gameService.stopGame();
        this.router.navigate(['/']);
    }
  }
}
