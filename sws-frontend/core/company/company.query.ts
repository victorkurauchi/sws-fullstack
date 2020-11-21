import { Query } from '@datorama/akita';

import { CompanyStore, companyStore } from './company.store';
import { CompanyStateInterface } from './company.state';

export class CompanyQuery extends Query<CompanyStateInterface> {
  constructor(protected store: CompanyStore) {
    super(store);
  }

  public get companies() {
    return this.select(state => state.companies);
  }

  public get isSearching() {
    return this.select(state => state.isSearching);
  }

  public getIsSearching = () => this.select(state => state.isSearching);

  public get isLoading() {
    return this.select(state => state.isLoading);
  }

  public get currentCompany() {
    return this.select(state => state.selectedCompany);
  }

  public get currentCompanyId() {
    return this.select(state => state.selectedCompanyId);
  }

  public get errors() {
    return this.select(state => state.error);
  }
}

export const companyQuery = new CompanyQuery(companyStore);
