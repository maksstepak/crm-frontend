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
import { CompanyService } from '../../services/company.service';
import { DropdownModule } from 'primeng/dropdown';
import { CompanySize } from '../../models/company.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-company-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './create-company-form.component.html',
})
export class CreateCompanyFormComponent {
  isSubmitting = false;
  formGroup = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    size: new FormControl(CompanySize.Small, {
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
  ) {}

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid || this.isSubmitting) {
      return;
    }
    this.companyService.create(this.formGroup.getRawValue()).subscribe(() => {
      this.ref.close(true);
    });
  }
}
