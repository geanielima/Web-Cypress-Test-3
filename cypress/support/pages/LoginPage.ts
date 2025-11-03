class LoginPage {
  // Selectors
  private usernameInput = '#username';
  private passwordInput = '#password';
  private submitButton = 'button[type="submit"]';
  private flashMessage = '#flash';
  private usernameLabel = 'label[for="username"]';
  private passwordLabel = 'label[for="password"]';

  // Methods
  visit() {
    cy.visit('/login');
  }

  getUsernameInput() {
    return cy.get(this.usernameInput);
  }

  getPasswordInput() {
    return cy.get(this.passwordInput);
  }

  getSubmitButton() {
    return cy.get(this.submitButton);
  }

  getFlashMessage() {
    return cy.get(this.flashMessage);
  }

  typeUsername(username: string) {
    this.getUsernameInput().type(username);
  }

  typePassword(password: string) {
    this.getPasswordInput().type(password);
  }

  clickSubmit() {
    this.getSubmitButton().click();
  }

  login(username: string, password: string) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickSubmit();
  }

  loginValid() {
    this.login('tomsmith', 'SuperSecretPassword!');
  }

  verifyPageLoaded() {
    cy.contains('Login Page').should('be.visible');
    this.getUsernameInput().should('be.visible');
    this.getPasswordInput().should('be.visible');
    this.getSubmitButton().should('be.visible').and('contain', 'Login');
  }

  verifyPlaceholders() {
    cy.get(this.usernameLabel).should('contain', 'Username');
    cy.get(this.passwordLabel).should('contain', 'Password');
  }

  verifyFieldsEmpty() {
    this.getUsernameInput().should('have.value', '');
    this.getPasswordInput().should('have.value', '');
  }

  verifyPasswordMasked() {
    this.getPasswordInput().should('have.attr', 'type', 'password');
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/secure');
    cy.contains('You logged into a secure area!').should('exist');
    cy.contains('Secure Area').should('be.visible');
  }

  verifyLoginError(message: string) {
    this.getFlashMessage().should('contain', message);
    this.getFlashMessage().should('have.class', 'error');
    cy.url().should('not.include', '/secure');
  }

  verifyFieldsClearedAfterError() {
    this.verifyFieldsEmpty();
  }

  logout() {
    cy.contains('Logout').click();
  }

  verifyLogoutSuccess() {
    cy.url().should('include', '/login');
    cy.contains('You logged out of the secure area!').should('exist');
  }
}

export default LoginPage;