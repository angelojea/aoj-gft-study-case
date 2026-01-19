import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'companies',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./companies/company-list/company-list.component').then(
            (m) => m.CompanyListComponent,
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./companies/company-detail/company-detail.component').then(
            (m) => m.CompanyDetailComponent,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./companies/company-detail/company-detail.component').then(
            (m) => m.CompanyDetailComponent,
          ),
      },
    ],
  },
  {
    path: 'contacts',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./contacts/contact-list/contact-list.component').then(
            (m) => m.ContactListComponent,
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./contacts/contact-detail/contact-detail.component').then(
            (m) => m.ContactDetailComponent,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./contacts/contact-detail/contact-detail.component').then(
            (m) => m.ContactDetailComponent,
          ),
      },
    ],
  },
  {
    path: 'addresses',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./addresses/address-list/address-list.component').then(
            (m) => m.AddressListComponent,
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./addresses/address-detail/address-detail.component').then(
            (m) => m.AddressDetailComponent,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./addresses/address-detail/address-detail.component').then(
            (m) => m.AddressDetailComponent,
          ),
      },
    ],
  },
];
