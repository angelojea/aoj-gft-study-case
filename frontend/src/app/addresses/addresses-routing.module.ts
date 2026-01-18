import { Routes } from '@angular/router';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { AddressListComponent } from './address-list/address-list.component';

export const ADDRESS_ROUTES: Routes = [
  { path: '', component: AddressListComponent },
  { path: 'new', component: AddressDetailComponent },
  { path: ':id', component: AddressDetailComponent },
];
