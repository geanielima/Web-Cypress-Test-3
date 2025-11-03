import DropdownPage from '../../support/pages/DropdownPage';

describe('Dropdown', () => {
  let dropdownPage: DropdownPage;

  beforeEach(() => {
    dropdownPage = new DropdownPage();
    dropdownPage.visit();
  })

  it('should display dropdown page correctly', () => {
    cy.log('Verifying that the dropdown page loaded correctly');
    dropdownPage.verifyPageLoaded();
    
    cy.log('Verifying that the dropdown is a select element');
    dropdownPage.verifyIsSelectElement();
  })

  it('should display all available options', () => {
    cy.log('Verifying that all expected options are present in the dropdown');
    dropdownPage.verifyThreeOptions();
    
    cy.log('Verifying the texts of the dropdown options');
    dropdownPage.verifyOptionTexts();
  })

  it('should select Option 1 by text', () => {
    cy.log('Selecting Option 1 by its visible text');
    dropdownPage.selectOption1();
    
    cy.log('Verifying that Option 1 is selected');
    dropdownPage.verifyOption1Selected();
  })

  it('should select Option 2 by text', () => {
    cy.log('Selecting Option 2 by its visible text');
    dropdownPage.selectOption2();

    cy.log('Verifying that Option 2 is selected');
    dropdownPage.verifyOption2Selected();
  })

  it('should select Option 1 by value', () => {
    cy.log('Selecting Option 1 by its value');
    dropdownPage.selectOptionByValue('1');

    cy.log('Verifying that Option 1 is selected');
    dropdownPage.verifyOption1Selected();
  })

  it('should select Option 2 by value', () => {
    cy.log('Selecting Option 2 by its value');
    dropdownPage.selectOptionByValue('2');

    cy.log('Verifying that Option 2 is selected');
    dropdownPage.verifyOption2Selected();
  })

  it('should allow changing selection', () => {
    cy.log('Changing selection between options multiple times');
    dropdownPage.selectOption1();
    dropdownPage.verifyOption1Selected();
    
    cy.log('Changing to Option 2');
    dropdownPage.selectOption2();
    dropdownPage.verifyOption2Selected();

    cy.log('Changing to Option 1');
    dropdownPage.selectOption1();
    dropdownPage.verifyOption1Selected();
  })
})