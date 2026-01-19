import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ContactService } from '../contact.service';

import { CustomValidators } from '../../shared/validators/validations';
// PrimeNG Modules
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    TranslateModule,
  ],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode: boolean = false;
  contactId?: number;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.contactForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, CustomValidators.cpfValidator]],
      dateOfBirth: [
        '',
        [Validators.required, CustomValidators.dateOfBirthValidator],
      ],
    });
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId) {
      this.isEditMode = true;
      this.contactService.getContact(this.contactId).subscribe((contact) => {
        this.contactForm.patchValue(contact);
      });
    }
  }

  save(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contactData = this.contactForm.value;

    if (this.isEditMode) {
      this.contactService
        .updateContact({ id: this.contactId, ...contactData })
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contact updated',
          });
          this.router.navigate(['/contacts']);
        });
    } else {
      this.contactService.createContact(contactData).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contact created',
        });
        this.router.navigate(['/contacts']);
      });
    }
  }

  cancel(): void {
    window.history.back();
  }
}
