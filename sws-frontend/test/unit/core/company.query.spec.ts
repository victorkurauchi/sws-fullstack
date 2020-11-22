import { CompanyQuery, CompanyStore } from "../../../core/company";
import { COMPANY_INITIAL_STATE } from "../../../core/company/company.state";

describe('CompanyQuery', () => {
  let store: CompanyStore;
  let query: CompanyQuery;

  beforeEach(() => {
    store = new CompanyStore({
      ...COMPANY_INITIAL_STATE,
      companies: [
        {
          id: 1,
          name: 'company test',
        } as any
      ]
    });
    query = new CompanyQuery(store);
  });

  test('query all companies', (done) => {
    query.companies.subscribe(result => {
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('company test');
      done();
    });
  });
});
