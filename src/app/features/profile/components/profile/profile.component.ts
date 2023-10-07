import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  isLoading = true;
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }
}
