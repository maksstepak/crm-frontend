import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyContactService } from '../../services/company-contact.service';
import { CompanyContact } from '../../models/company-contact.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CreateCompanyContactFormComponent } from '../create-company-contact-form/create-company-contact-form.component';
import { EditCompanyContactFormComponent } from '../edit-company-contact-form/edit-company-contact-form.component';

@Component({
  selector: 'app-company-contact-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './company-contact-list.component.html',
})
export class CompanyContactListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) companyId!: number;
  isLoading = true;
  contacts: CompanyContact[] = [];
  createCompanyContactFormRef: DynamicDialogRef | undefined;
  editCompanyContactFormRef: DynamicDialogRef | undefined;

  constructor(
    private companyContactService: CompanyContactService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadCompanyContacts();
  }

  loadCompanyContacts() {
    this.isLoading = true;
    this.companyContactService
      .getAllByCompanyId(this.companyId)
      .subscribe((contacts) => {
        this.contacts = contacts;
        this.isLoading = false;
      });
  }

  showCreateCompanyContactModal() {
    this.createCompanyContactFormRef = this.dialogService.open(
      CreateCompanyContactFormComponent,
      {
        header: $localize`Create new contact`,
        data: {
          companyId: this.companyId,
        },
      },
    );

    this.createCompanyContactFormRef.onClose.subscribe(
      (userCreated: boolean | undefined) => {
        if (userCreated) {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`Contact added`,
          });
          this.loadCompanyContacts();
        }
      },
    );
  }

  showEditCompanyContactModal(companyContact: CompanyContact) {
    this.editCompanyContactFormRef = this.dialogService.open(
      EditCompanyContactFormComponent,
      {
        header: $localize`Edit contact`,
        data: {
          companyContact,
        },
      },
    );
    this.editCompanyContactFormRef.onClose.subscribe(
      (userUpdated: boolean | undefined) => {
        if (userUpdated) {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`Contact updated`,
          });
          this.loadCompanyContacts();
        }
      },
    );
  }

  showDeleteCompanyContactModal(companyContact: CompanyContact) {
    this.confirmationService.confirm({
      message: $localize`Do you want to delete this contact?`,
      header: $localize`Delete Confirmation`,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.companyContactService.delete(companyContact.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`Contact deleted`,
          });
          this.loadCompanyContacts();
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.createCompanyContactFormRef?.close();
    this.editCompanyContactFormRef?.close();
  }
}
