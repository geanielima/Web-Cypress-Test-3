// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

// Declare global namespace for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with username and password
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>
      
      /**
       * Custom command to get element by data-cy attribute
       * @example cy.getByCy('submit-button')
       */
      getByCy(selector: string): Chainable<JQuery<HTMLElement>>
      
      /**
       * Custom command to wait for page to load
       * @example cy.waitForPageLoad()
       */
      waitForPageLoad(): Chainable<void>
      
      /**
       * Custom command to check if element is visible and click
       * @example cy.clickIfVisible('#submit-btn')
       */
      clickIfVisible(selector: string): Chainable<void>
      
      /**
       * Custom command to drag and drop elements
       * @example cy.dragDrop('#source', '#target')
       */
      dragDrop(sourceSelector: string, targetSelector: string): Chainable<void>
    }
  }
}

// Custom command: Login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-cy="email-input"]').type(email)
  cy.get('[data-cy="password-input"]').type(password)
  cy.get('[data-cy="login-button"]').click()
  cy.url().should('not.include', '/login')
})

// Custom command: Get by data-cy attribute
Cypress.Commands.add('getByCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`)
})

// Custom command: Wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().its('document.readyState').should('equal', 'complete')
})

// Custom command: Click if visible
Cypress.Commands.add('clickIfVisible', (selector: string) => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length > 0) {
      cy.get(selector).click()
    }
  })
})

// Custom command: Drag and drop
Cypress.Commands.add('dragDrop', (sourceSelector: string, targetSelector: string) => {
  const dataTransfer = new DataTransfer()
  
  cy.get(sourceSelector).trigger('dragstart', { dataTransfer })
  cy.get(targetSelector).trigger('drop', { dataTransfer })
})

// Prevent TypeScript from reading file as legacy script
export {}