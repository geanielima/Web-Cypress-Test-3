class RedirectPage {
  // Selectors
  private redirectLink = 'a[href="/redirect"]';

  // Methods
  visit() {
    cy.visit('/redirector');
  }

  getRedirectLink() {
    return cy.contains('here');
  }

  clickRedirectLink() {
    this.getRedirectLink().click();
  }

  verifyOnRedirectorPage() {
    cy.location('pathname').should('equal', '/redirector');
  }

  verifyRedirected() {
    cy.location('pathname').should('not.equal', '/redirector');
  }
}

export default RedirectPage;