import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'companies',
    loadChildren: () =>
      import('./companies/companies-routing.module').then(
        (m) => m.COMPANY_ROUTES,
      ),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./contacts/contacts-routing.module').then(
        (m) => m.CONTACT_ROUTES,
      ),
  },
  {
    path: 'addresses',
    loadChildren: () =>
      import('./addresses/addresses-routing.module').then(
        (m) => m.ADDRESS_ROUTES,
      ),
  },
];
