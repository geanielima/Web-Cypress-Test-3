import CheckboxesPage from '../../support/pages/CheckboxesPage';

describe('Checkboxes', () => {
  let checkboxesPage: CheckboxesPage;

  beforeEach(() => {
    checkboxesPage = new CheckboxesPage();
    checkboxesPage.visit();
  })

  it('should display checkboxes page correctly', () => {
    cy.log('verifying if the checkboxes page loaded correctly');
    checkboxesPage.verifyPageLoaded();
    cy.log('verifying if there are exactly 2 checkboxes on the page');
    checkboxesPage.verifyTwoCheckboxesExist();
  })

  it('should toggle first checkbox from unchecked to checked', () => {
    cy.log('verifying initial state of the first checkbox');
    checkboxesPage.verifyFirstCheckboxUnchecked();
    
    cy.log('toggling the first checkbox to checked state');
    checkboxesPage.toggleFirstCheckbox();
    checkboxesPage.verifyFirstCheckboxChecked();
    
    cy.log('toggling the first checkbox back to unchecked state');
    checkboxesPage.toggleFirstCheckbox();
    checkboxesPage.verifyFirstCheckboxUnchecked();
  })

  it('should toggle second checkbox from checked to unchecked', () => {
    cy.log('verifying initial state of the second checkbox');
    checkboxesPage.verifySecondCheckboxChecked();

    cy.log('toggling the second checkbox to unchecked state');
    checkboxesPage.toggleSecondCheckbox();
    checkboxesPage.verifySecondCheckboxUnchecked();

    cy.log('toggling the second checkbox back to checked state');
    checkboxesPage.toggleSecondCheckbox();
    checkboxesPage.verifySecondCheckboxChecked();
  })

  it('should handle multiple checkbox interactions', () => {
    cy.log('marking the first checkbox');
    checkboxesPage.checkFirstCheckbox();
    checkboxesPage.verifyFirstCheckboxChecked();
    
    cy.log('unmarking the second checkbox');
    checkboxesPage.uncheckSecondCheckbox();
    checkboxesPage.verifySecondCheckboxUnchecked();
    
    cy.log('verifying final states of both checkboxes');
    checkboxesPage.verifyFirstCheckboxChecked();
    checkboxesPage.verifySecondCheckboxUnchecked();
  })

  it('should maintain state after page refresh', () => {
    cy.log('setting initial states: first checkbox checked, second checkbox unchecked');
    checkboxesPage.checkFirstCheckbox();
    checkboxesPage.uncheckSecondCheckbox();
    
    cy.log('verifying states before refresh');
    checkboxesPage.verifyFirstCheckboxChecked();
    checkboxesPage.verifySecondCheckboxUnchecked();
    
    cy.log('refreshing the page to check state persistence');
    cy.reload();
    
   cy.log('verifying states after refresh - checkboxes should reset to default states');
    checkboxesPage.verifyFirstCheckboxUnchecked();
    checkboxesPage.verifySecondCheckboxChecked();
  })
})