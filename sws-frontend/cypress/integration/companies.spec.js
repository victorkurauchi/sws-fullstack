describe('Companies spec', () => {
  beforeEach(() => {
    cy.server();
  });

  it('visits /companies and make sure we have 10 records of companies', () => {
    cy.fixture('companies.json').as('companiesData').then((json) => {
      cy.route('GET', '/companies', json).as('getCompanies');
      cy.visit('/companies');
      cy.contains('h1', 'Companies');
      cy.get('table > tbody').find('tr').should('have.length', 10);
    });
  });

  it('visits /companies and make sure we can paginate and see 2 more records', () => {
    cy.fixture('companies.json').as('companiesData').then((json) => {
      cy.route('GET', '/companies', json).as('getCompanies');
      cy.visit('/companies');
      cy.contains('h1', 'Companies');
      cy.get('table > tbody').find('tr').should('have.length', 10);

      cy.get('li.ant-pagination-item.ant-pagination-item-2 > a').click({
        force: true
      });
      cy.get('table > tbody').find('tr').should('have.length', 2);
    });
  });

  it('visits /companies and can go to details', () => {
    cy.fixture('companies.json').as('companiesData').then((json) => {
      cy.route('GET', '/companies', json);
      cy.fixture('companyDetails.json').then((details) => {
        cy.visit('/companies');
        cy.contains('h1', 'Companies');
        cy.get('table > tbody').find('tr').should('have.length', 10);

        cy.route('GET', '/companies/**', details).as('companyDetailsData');
  
        cy.get('table > tbody > tr.ant-table-row > td.ant-table-cell > a').first().click({
          force: true
        });

        cy.wait(1000);

        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/companies/46B285BC-B25F-4814-985C-390A4BFA2023');
        });
      });
    });
  });
});
