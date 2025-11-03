class CheckboxesPage {
  // Selectors
  private checkboxesContainer = '#checkboxes';
  private checkboxes = '#checkboxes input[type="checkbox"]';

  // Methods
  visit() {
    cy.visit('https://the-internet.herokuapp.com/checkboxes');
  }

  getCheckboxesContainer() {
    return cy.get(this.checkboxesContainer);
  }

  getCheckboxes() {
    return cy.get(this.checkboxes);
  }

  getFirstCheckbox() {
    return cy.get(this.checkboxes).first();
  }

  getSecondCheckbox() {
    return cy.get(this.checkboxes).last();
  }

  checkFirstCheckbox() {
    this.getFirstCheckbox().check();
  }

  uncheckFirstCheckbox() {
    this.getFirstCheckbox().uncheck();
  }

  checkSecondCheckbox() {
    this.getSecondCheckbox().check();
  }

  uncheckSecondCheckbox() {
    this.getSecondCheckbox().uncheck();
  }

  toggleFirstCheckbox() {
    this.getFirstCheckbox().click();
  }

  toggleSecondCheckbox() {
    this.getSecondCheckbox().click();
  }

  verifyPageLoaded() {
    cy.contains('Checkboxes').should('be.visible');
    this.getCheckboxesContainer().should('be.visible');
  }

  verifyTwoCheckboxesExist() {
    this.getCheckboxes().should('have.length', 2);
  }

  verifyFirstCheckboxUnchecked() {
    this.getFirstCheckbox().should('not.be.checked');
  }

  verifyFirstCheckboxChecked() {
    this.getFirstCheckbox().should('be.checked');
  }

  verifySecondCheckboxChecked() {
    this.getSecondCheckbox().should('be.checked');
  }

  verifySecondCheckboxUnchecked() {
    this.getSecondCheckbox().should('not.be.checked');
  }

  verifyBothCheckboxesChecked() {
    this.verifyFirstCheckboxChecked();
    this.verifySecondCheckboxChecked();
  }

  verifyBothCheckboxesUnchecked() {
    this.verifyFirstCheckboxUnchecked();
    this.verifySecondCheckboxUnchecked();
  }

  focusFirstCheckbox() {
    this.getFirstCheckbox().focus();
  }

  focusSecondCheckbox() {
    this.getSecondCheckbox().focus();
  }

  toggleFocusedCheckbox() {
    cy.focused().type(' ');
  }
}

export default CheckboxesPage;