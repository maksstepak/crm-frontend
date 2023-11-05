import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CompanyContact,
  CreateCompanyContactRequest,
  UpdateCompanyContactRequest,
} from '../models/company-contact.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyContactService {
  constructor(private http: HttpClient) {}

  getAllByCompanyId(companyId: number) {
    return this.http.get<CompanyContact[]>(
      `/api/companies/${companyId}/contacts`,
    );
  }

  create(companyId: number, body: CreateCompanyContactRequest) {
    return this.http.post(`/api/companies/${companyId}/contacts`, body);
  }

  update(companyContactId: number, body: UpdateCompanyContactRequest) {
    return this.http.put(`/api/company-contacts/${companyContactId}`, body);
  }

  delete(companyContactId: number) {
    return this.http.delete(`/api/company-contacts/${companyContactId}`);
  }
}
