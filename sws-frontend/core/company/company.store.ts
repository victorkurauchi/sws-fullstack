import { Store, StoreConfig, enableAkitaProdMode } from '@datorama/akita';
import { CompanyStateInterface, COMPANY_INITIAL_STATE } from './company.state';

if (process.env.NODE_ENV === 'production') {
  enableAkitaProdMode();
}

@StoreConfig({ name: 'CompaniesApp' })
export class CompanyStore extends Store<CompanyStateInterface> {
  constructor(state: CompanyStateInterface) {
    super(state);
  }
}

export const companyStore = new CompanyStore(COMPANY_INITIAL_STATE);
