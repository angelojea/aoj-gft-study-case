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
import { CompanyService } from '../company.service';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-company-detail',
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
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  providers: [MessageService, CompanyService],
})
export class CompanyDetailComponent implements OnInit {
  companyForm: FormGroup;
  isEditMode: boolean = false;
  companyId?: number;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      cnpj: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.companyId = +this.route.snapshot.params['id'];
    if (this.companyId) {
      this.isEditMode = true;
      this.companyService.getCompany(this.companyId).subscribe((company) => {
        this.companyForm.patchValue(company);
      });
    }
  }

  save(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const companyData = this.companyForm.value;

    if (this.isEditMode) {
      this.companyService
        .updateCompany({ id: this.companyId, ...companyData })
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Company updated',
          });
          this.router.navigate(['/companies']);
        });
    } else {
      this.companyService.createCompany(companyData).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Company created',
        });
        this.router.navigate(['/companies']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/companies']);
  }
}
