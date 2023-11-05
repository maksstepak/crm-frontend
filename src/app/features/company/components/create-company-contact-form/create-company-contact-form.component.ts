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
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-company-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './create-company-contact-form.component.html',
})
export class CreateCompanyContactFormComponent {
  isSubmitting = false;
  formGroup = new FormGroup({
    firstName: new FormControl<string | null>(null),
    lastName: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    phoneNumber: new FormControl<string | null>(null, [
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private companyContactService: CompanyContactService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig<{ companyId: number }>,
  ) {}

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid || this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    this.companyContactService
      .create(this.config.data!.companyId, this.formGroup.getRawValue())
      .subscribe(() => {
        this.ref.close(true);
      });
  }
}
