import { CompanyModel } from './company.model';

export interface CompanyStateInterface {
  companies: CompanyModel[];
  selectedCompanyId: string;
  selectedCompany: any;
  error: any;
  sortCriteria: any;
  isLoading: boolean;
  isSearching: boolean;
  totalCount: number;
}

export const COMPANY_INITIAL_STATE: CompanyStateInterface = {
  companies: [],
  selectedCompanyId: '',
  selectedCompany: null,
  error: null,
  sortCriteria: {},
  isLoading: false,
  isSearching: false,
  totalCount: 0,
};
