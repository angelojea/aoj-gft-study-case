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

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

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
    ToastModule,
  ],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  providers: [MessageService, ContactService],
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.contactId = +this.route.snapshot.params['id'];
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
    this.router.navigate(['/contacts']);
  }
}
