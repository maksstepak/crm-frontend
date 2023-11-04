import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Company, CompanySize } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-company-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './edit-company-form.component.html',
})
export class EditCompanyFormComponent {
  isSubmitting = false;
  formGroup = new FormGroup({
    name: new FormControl(this.config.data!.company.name, {
      nonNullable: true,
      validators: Validators.required,
    }),
    size: new FormControl(this.config.data!.company.size, {
      nonNullable: true,
    }),
  });
  sizes = [
    { label: $localize`Small`, value: CompanySize.Small },
    { label: $localize`Medium`, value: CompanySize.Medium },
    { label: $localize`Large`, value: CompanySize.Large },
  ];

  constructor(
    private companyService: CompanyService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig<{ company: Company }>,
  ) {}

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid || this.isSubmitting) {
      return;
    }
    this.companyService
      .update(this.config.data!.company.id, this.formGroup.getRawValue())
      .subscribe(() => {
        this.ref.close(true);
      });
  }
}
