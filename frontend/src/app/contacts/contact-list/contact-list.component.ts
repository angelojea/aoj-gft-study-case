import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ToolbarModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [ConfirmationService],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact!: Contact;
  displayModal: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((data) => (this.contacts = data));
  }

  viewDetails(contact: Contact): void {
    this.selectedContact = contact;
    this.displayModal = true;
  }

  editContact(contact: Contact): void {
    this.router.navigate(['/contacts', contact.id]);
  }

  deleteContact(contact: Contact): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this contact?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contactService.deleteContact(contact.id!).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contact deleted',
          });
          this.loadContacts();
        });
      },
    });
  }

  addNew(): void {
    this.router.navigate(['/contacts/new']);
  }
}
