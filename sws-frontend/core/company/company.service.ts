import { CompanyStore, companyStore } from './company.store';

const BASE_URL = 'http://localhost:4000';

export class CompanyService {
  constructor(private store: CompanyStore) {}

  public closeCurrentCompany = () => {
    this.store.update(() => ({
      selectedCompanyId: '',
      selectedCompany: null,
    }));
  };

  public getCompanies = (search?: string) => {
    const endpoint = `${BASE_URL}/companies?take=50`;

    this.store.update(() => ({
      isSearching: true,
      currentSearch: search,
      companies: [],
      selectedCompanyId: '',
      selectedCompany: null,
    }));

    fetch(search ? endpoint.concat(`&search=${search}`) : endpoint)
      .then(response => response.json())
      .then(result =>
        this.store.update(() => ({
          isSearching: false,
          companies: result.data,
          totalCount: result.totalCount
        })),
      )
      .catch(error => this.store.update(() => ({ error, isSearching: false })));
  };

  public getCompany = (uuid: string) => {
    this.store.update(() => ({
      isLoading: true,
      selectedCompanyId: uuid,
      selectedCompany: null,
    }));

    fetch(`${BASE_URL}/companies/${uuid}`)
      .then(response => response.json())
      .then((result) => {
        if (result.statusCode >= 400) {
          this.store.update(() => ({
            isLoading: false,
            error: result,
          }));
        } else {
          this.store.update(() => ({
            isLoading: false,
            selectedCompany: result
          }))
        }
      })
      .catch(error => this.store.update(() => ({ error, isLoading: false })));
  };
}

export const companyService = new CompanyService(companyStore);
