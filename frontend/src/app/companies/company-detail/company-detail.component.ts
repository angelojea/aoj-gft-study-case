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

import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CustomValidators } from '../../shared/validators/validations';

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
    CalendarModule,
    TranslateModule,
  ],
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      cnpj: ['', [Validators.required, CustomValidators.cnpjValidator]],
      dateFounded: [
        '',
        [Validators.required, CustomValidators.dateFoundedValidator],
      ],
    });
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params['id'];
    if (this.companyId) {
      this.isEditMode = true;
      this.companyService.getCompany(this.companyId).subscribe((company) => {
        company.dateFounded = new Date(company.dateFounded);
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
    window.history.back();
  }
}
