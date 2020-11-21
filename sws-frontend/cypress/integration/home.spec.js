describe('Home spec', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('home page renders as expected', () => {
    cy.visit('/');
    cy.contains('h1', 'Hello Next.js');
  });
});
