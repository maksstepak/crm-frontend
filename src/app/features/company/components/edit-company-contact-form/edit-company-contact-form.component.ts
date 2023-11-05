import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompanyContactService } from '../../services/company-contact.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompanyContact } from '../../models/company-contact.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-company-contact-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './edit-company-contact-form.component.html',
})
export class EditCompanyContactFormComponent {
  isSubmitting = false;
  formGroup = new FormGroup({
    firstName: new FormControl(this.config.data!.companyContact.firstName),
    lastName: new FormControl(this.config.data!.companyContact.lastName),
    email: new FormControl(this.config.data!.companyContact.email),
    phoneNumber: new FormControl(this.config.data!.companyContact.phoneNumber, [
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private companyContactService: CompanyContactService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig<{ companyContact: CompanyContact }>,
  ) {}

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid || this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    this.companyContactService
      .update(this.config.data!.companyContact.id, this.formGroup.getRawValue())
      .subscribe(() => {
        this.ref.close(true);
      });
  }
}
