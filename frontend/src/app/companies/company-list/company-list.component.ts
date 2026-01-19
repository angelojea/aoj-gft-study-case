import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../company';
import { CompanyService } from '../company.service';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-company-list',
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
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  providers: [ConfirmationService],
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany!: Company;
  displayModal: boolean = false;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService
      .getCompanies()
      .subscribe((data) => (this.companies = data));
  }

  viewDetails(company: Company): void {
    this.selectedCompany = company;
    this.displayModal = true;
  }

  editCompany(company: Company): void {
    this.router.navigate(['/companies', company.id]);
  }

  deleteCompany(company: Company): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this company?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companyService.deleteCompany(company.id!).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Company deleted',
          });
          this.loadCompanies();
        });
      },
    });
  }

  addNew(): void {
    this.router.navigate(['/companies/new']);
  }
}
