import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from '../models/company.model';
import { Page } from '../../../core/models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getAll(page: number, size: number) {
    const queryParams = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Company>>('/api/companies', {
      params: queryParams,
    });
  }

  getById(companyId: number) {
    return this.http.get<Company>(`/api/companies/${companyId}`);
  }

  create(body: CreateCompanyRequest) {
    return this.http.post('/api/companies', body);
  }

  update(companyId: number, body: UpdateCompanyRequest) {
    return this.http.put(`/api/companies/${companyId}`, body);
  }

  delete(companyId: number) {
    return this.http.delete(`/api/companies/${companyId}`);
  }
}
