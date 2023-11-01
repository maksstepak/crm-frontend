import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './features/profile/pages/profile/profile.component';
import { LoginComponent } from './features/login/pages/login/login.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { UsersComponent } from './features/user/pages/users/users.component';
import { CompaniesComponent } from './features/company/pages/companies/companies.component';
import { CompanyComponent } from './features/company/pages/company/company.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'companies/:companyId',
    component: CompanyComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
