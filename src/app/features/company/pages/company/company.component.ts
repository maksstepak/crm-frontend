import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';
import { Company, CompanySize } from '../../models/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditCompanyFormComponent } from '../../components/edit-company-form/edit-company-form.component';
import { CompanyContactListComponent } from '../../components/company-contact-list/company-contact-list.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    TagModule,
    CompanyContactListComponent,
  ],
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit, OnDestroy {
  isLoading = true;
  companyId!: number;
  company!: Company;
  editCompanyFormRef: DynamicDialogRef | undefined;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.companyId = +this.route.snapshot.paramMap.get('companyId')!;
  }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    this.isLoading = true;
    this.companyService.getById(this.companyId).subscribe((company) => {
      this.company = company;
      this.isLoading = false;
    });
  }

  get translatedSize(): string {
    switch (this.company.size) {
      case CompanySize.Small:
        return $localize`Small`;
      case CompanySize.Medium:
        return $localize`Medium`;
      case CompanySize.Large:
        return $localize`Large`;
    }
  }

  showEditCompanyModal() {
    this.editCompanyFormRef = this.dialogService.open(
      EditCompanyFormComponent,
      {
        header: $localize`Edit company`,
        data: {
          company: this.company,
        },
      },
    );
    this.editCompanyFormRef.onClose.subscribe(
      (companyUpdated: boolean | undefined) => {
        if (companyUpdated) {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`Company updated`,
          });
          this.loadCompany();
        }
      },
    );
  }

  showDeleteCompanyModal() {
    this.confirmationService.confirm({
      message: $localize`Do you want to delete this company?`,
      header: $localize`Delete Confirmation`,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.companyService.delete(this.company.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`Company deleted`,
          });
          this.router.navigate(['/companies']);
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.editCompanyFormRef?.close();
  }
}
