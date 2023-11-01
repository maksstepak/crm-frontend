import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Company } from '../../models/company.model';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCompanyFormComponent } from '../../components/create-company-form/create-company-form.component';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnDestroy {
  isLoading = true;
  totalRecords!: number;
  companies!: Company[];
  lastTableLazyLoadEvent: TableLazyLoadEvent | undefined;
  createCompanyFormRef: DynamicDialogRef | undefined;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessageService,
  ) {}

  loadCompanies(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    const page = event.first! / event.rows!;
    this.isLoading = true;
    this.companyService.getAll(page, 20).subscribe((page) => {
      this.companies = page.content;
      this.totalRecords = page.totalElements;
      this.isLoading = false;
    });
  }

  handleRowSelect(company: Company) {
    this.router.navigate(['/companies', company.id]);
  }

  showCreateCompanyModal() {
    this.createCompanyFormRef = this.dialogService.open(
      CreateCompanyFormComponent,
      {
        header: $localize`Create new company`,
      },
    );

    this.createCompanyFormRef.onClose.subscribe(
      (companyCreated: boolean | undefined) => {
        if (companyCreated) {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`Company added`,
          });
          this.loadCompanies(this.lastTableLazyLoadEvent!);
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.createCompanyFormRef?.close();
  }
}
