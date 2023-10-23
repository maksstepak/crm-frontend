import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './edit-user-form.component.html',
})
export class EditUserFormComponent {
  isSubmitting = false;
  formGroup = new FormGroup({
    firstName: new FormControl(
      this.config.data.user.firstName,
      Validators.required,
    ),
    lastName: new FormControl(
      this.config.data.user.lastName,
      Validators.required,
    ),
  });

  constructor(
    private userService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    console.log(this.config.data);
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid || this.isSubmitting) {
      return;
    }
    this.userService
      .update(this.config.data.user.id, {
        firstName: this.formGroup.value.firstName!,
        lastName: this.formGroup.value.lastName!,
      })
      .subscribe(() => {
        this.ref.close(true);
      });
  }
}
