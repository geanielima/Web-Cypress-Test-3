import LoginPage from '../../support/pages/LoginPage';

describe('Login', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
  })

  it('should display the login page correctly and fields are empty', () => {
    cy.log('Verifying that the login page loaded correctly');
    loginPage.verifyPageLoaded();

    cy.log('Verifying placeholders for username and password fields');
    loginPage.verifyPlaceholders();

    cy.log('Verifying that username and password fields are empty');
    loginPage.verifyFieldsEmpty();
  })

  it('should perform valid login', () => {
    cy.log('Performing valid login');
    loginPage.loginValid();

    cy.log('Verifying successful login and redirection');
    loginPage.verifyLoginSuccess();
  })

  it('should mask password input', () => {
    cy.log('Typing password and verifying it is masked');
    loginPage.getPasswordInput().type('password123');
    cy.log('Verifying that the password input is masked');
    loginPage.verifyPasswordMasked();
  })

  it('should show error for invalid username', () => {
    cy.log('Performing login with invalid username');
    loginPage.login('wronguser', 'SuperSecretPassword!');

    cy.log('Verifying error message for invalid username');
    loginPage.verifyLoginError('Your username is invalid!');
  })

  it('should show error for invalid password', () => {
    cy.log('Performing login with invalid password');
    loginPage.login('tomsmith', 'wrongpassword');

    cy.log('Verifying error message for invalid password');
    loginPage.verifyLoginError('Your password is invalid!');
  })

  it('should show error for completely invalid credentials', () => {
    cy.log('Performing login with completely invalid credentials');
    loginPage.login('wrong', 'wrong');

    cy.log('Verifying error message for completely invalid credentials');
    loginPage.verifyLoginError('Your username is invalid!');
  })

  it('should allow logout after successful login', () => {
    cy.log('Performing valid login');
    loginPage.loginValid();

    cy.log('Verifying successful login and redirection');
    loginPage.verifyLoginSuccess();

    cy.log('Logging out');
    loginPage.logout();

    cy.log('Verifying logout success');
    loginPage.verifyLogoutSuccess();
  })
})