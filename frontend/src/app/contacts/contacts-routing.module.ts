import { Routes } from '@angular/router';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';

export const CONTACT_ROUTES: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'new', component: ContactDetailComponent },
  { path: ':id', component: ContactDetailComponent },
];
