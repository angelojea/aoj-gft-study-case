import { Routes } from '@angular/router';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyListComponent } from './company-list/company-list.component';

export const COMPANY_ROUTES: Routes = [
  { path: '', component: CompanyListComponent },
  { path: 'new', component: CompanyDetailComponent },
  { path: ':id', component: CompanyDetailComponent },
];
