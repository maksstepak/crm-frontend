export enum CompanySize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

export interface Company {
  id: number;
  name: string;
  size: CompanySize;
}

export interface CreateCompanyRequest {
  name: string;
  size: CompanySize;
}

export interface UpdateCompanyRequest {
  name: string;
  size: CompanySize;
}
