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
import { AddressService } from '../address.service';

// PrimeNG Modules
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-address-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TranslateModule,
  ],
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss'],
})
export class AddressDetailComponent implements OnInit {
  addressForm: FormGroup;
  isEditMode: boolean = false;
  addressId?: number;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.addressForm = this.fb.group({
      zip: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    });
  }

  ngOnInit(): void {
    this.addressId = +this.route.snapshot.params['id'];
    if (this.addressId) {
      this.isEditMode = true;
      this.addressService.getAddress(this.addressId).subscribe((address) => {
        this.addressForm.patchValue(address);
      });
    }
  }

  save(): void {
    if (this.addressForm.invalid) {
      return;
    }

    const addressData = this.addressForm.value;

    if (this.isEditMode) {
      this.addressService
        .updateAddress({ id: this.addressId, ...addressData })
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Address updated',
          });
          this.router.navigate(['/addresses']);
        });
    } else {
      this.addressService.createAddress(addressData).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Address created',
        });
        this.router.navigate(['/addresses']);
      });
    }
  }

  cancel(): void {
    window.history.back();
  }
}
