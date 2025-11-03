class DropdownPage {
  // Selectors
  private dropdown = '#dropdown';
  private dropdownOptions = '#dropdown option';
  private selectedOption = '#dropdown option:selected';

  // Methods
  visit() {
    cy.visit('https://the-internet.herokuapp.com/dropdown');
  }

  getDropdown() {
    return cy.get(this.dropdown);
  }

  getDropdownOptions() {
    return cy.get(this.dropdownOptions);
  }

  getSelectedOption() {
    return cy.get(this.selectedOption);
  }

  selectOptionByText(text: string) {
    this.getDropdown().select(text);
  }

  selectOptionByValue(value: string) {
    this.getDropdown().select(value);
  }

  selectOption1() {
    this.selectOptionByText('Option 1');
  }

  selectOption2() {
    this.selectOptionByText('Option 2');
  }

  verifyPageLoaded() {
    cy.contains('Dropdown List').should('be.visible');
    this.getDropdown().should('be.visible');
  }

  verifyIsSelectElement() {
    this.getDropdown().should('have.prop', 'tagName', 'SELECT');
  }

  verifyThreeOptions() {
    this.getDropdownOptions().should('have.length', 3);
  }

  verifyOptionTexts() {
    this.getDropdownOptions().eq(0).should('contain', 'Please select an option');
    this.getDropdownOptions().eq(1).should('contain', 'Option 1');
    this.getDropdownOptions().eq(2).should('contain', 'Option 2');
  }

  verifyOption1Selected() {
    this.getDropdown().should('have.value', '1');
    this.getSelectedOption().should('contain', 'Option 1');
  }

  verifyOption2Selected() {
    this.getDropdown().should('have.value', '2');
    this.getSelectedOption().should('contain', 'Option 2');
  }

  focusDropdown() {
    return this.getDropdown().focus();
  }

  openDropdownWithEnter() {
    this.focusDropdown().type('{enter}');
  }

  navigateWithArrowKeys() {
    this.focusDropdown().type('{downarrow}').type('{enter}');
  }
}

export default DropdownPage;