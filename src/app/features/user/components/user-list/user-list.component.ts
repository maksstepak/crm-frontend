import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnDestroy {
  totalRecords!: number;
  isLoading = true;
  users!: User[];
  createUserFormRef: DynamicDialogRef | undefined;
  editUserFormRef: DynamicDialogRef | undefined;
  lastTableLazyLoadEvent: TableLazyLoadEvent | undefined;

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  loadUsers(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    const page = event.first! / event.rows!;
    this.isLoading = true;
    this.userService.getAll(page, 20).subscribe((page) => {
      this.users = page.content;
      this.totalRecords = page.totalElements;
      this.isLoading = false;
    });
  }

  showCreateUserModal() {
    this.createUserFormRef = this.dialogService.open(CreateUserFormComponent, {
      header: $localize`Create new user`,
    });

    this.createUserFormRef.onClose.subscribe(
      (userCreated: boolean | undefined) => {
        if (userCreated) {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`User added`,
          });
          this.loadUsers(this.lastTableLazyLoadEvent!);
        }
      },
    );
  }

  showEditUserModal(user: User) {
    this.editUserFormRef = this.dialogService.open(EditUserFormComponent, {
      header: $localize`Edit user`,
      data: {
        user,
      },
    });
    this.editUserFormRef.onClose.subscribe(
      (userUpdated: boolean | undefined) => {
        if (userUpdated) {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`User updated`,
          });
          this.loadUsers(this.lastTableLazyLoadEvent!);
        }
      },
    );
  }

  showDeleteUserModal(user: User) {
    this.confirmationService.confirm({
      message: $localize`Do you want to delete this user?`,
      header: $localize`Delete Confirmation`,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.delete(user.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: $localize`Success`,
            detail: $localize`User deleted`,
          });
          this.loadUsers(this.lastTableLazyLoadEvent!);
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.createUserFormRef?.close();
    this.editUserFormRef?.close();
  }
}
