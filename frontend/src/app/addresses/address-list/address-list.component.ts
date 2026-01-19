import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Address } from '../address';
import { AddressService } from '../address.service';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-address-list',
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
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
  providers: [ConfirmationService],
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddress!: Address;
  displayModal: boolean = false;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService
      .getAddresses()
      .subscribe((data) => (this.addresses = data));
  }

  viewDetails(address: Address): void {
    this.selectedAddress = address;
    this.displayModal = true;
  }

  editAddress(address: Address): void {
    this.router.navigate(['/addresses', address.id]);
  }

  deleteAddress(address: Address): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this address?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.addressService.deleteAddress(address.id!).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Address deleted',
          });
          this.loadAddresses();
        });
      },
    });
  }

  addNew(): void {
    this.router.navigate(['/addresses/new']);
  }
}
