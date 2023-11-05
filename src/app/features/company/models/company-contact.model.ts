export interface CompanyContact {
  id: number;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}

export interface CreateCompanyContactRequest {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}

export interface UpdateCompanyContactRequest {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}
