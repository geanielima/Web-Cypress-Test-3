import RedirectPage from '../../support/pages/RedirectPage';

describe('Redirect Link', () => {
  let redirectPage: RedirectPage;

  beforeEach(() => {
    redirectPage = new RedirectPage();
  });

  it('should follow redirect', () => {
    cy.log('Visiting redirector page');
    redirectPage.visit();
    cy.log('Clicking on the redirect link');
    redirectPage.clickRedirectLink();
    cy.log('Verifying redirection occurred');
    redirectPage.verifyRedirected();
  });
});