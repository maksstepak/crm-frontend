import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent implements OnInit, OnDestroy {
  isLoggedInSubscription: Subscription | undefined;
  isLoggedIn = false;
  itemsForLoggedInUser = [
    {
      label: $localize`Home`,
      icon: 'pi pi-fw pi-home',
      routerLink: '/',
    },
    {
      label: $localize`Users`,
      icon: 'pi pi-fw pi-users',
      routerLink: '/users',
    },
    {
      label: $localize`Companies`,
      icon: 'pi pi-fw pi-building',
      routerLink: '/companies',
    },
    {
      label: $localize`Profile`,
      icon: 'pi pi-fw pi-user',
      routerLink: '/profile',
    },
    {
      label: $localize`Logout`,
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        this.logout();
      },
    },
  ];
  itemsForNotLoggedInUser = [
    {
      label: $localize`Home`,
      icon: 'pi pi-fw pi-home',
      routerLink: '/',
    },
    {
      label: $localize`Login`,
      icon: 'pi pi-fw pi-sign-in',
      routerLink: '/login',
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      },
    );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription?.unsubscribe();
  }
}
