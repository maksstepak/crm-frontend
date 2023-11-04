import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { UserService } from '../../../../core/services/user.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './create-user-form.component.html',
})
export class CreateUserFormComponent {
  isSubmitting = false;
  formGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor(
    private userService: UserService,
    public ref: DynamicDialogRef,
  ) {}

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid || this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    this.userService.create(this.formGroup.getRawValue()).subscribe(() => {
      this.ref.close(true);
    });
  }
}
