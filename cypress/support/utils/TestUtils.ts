/**
 * Utilitários para ações comuns nos testes
 */
export class TestUtils {
  /**
   * Aguarda um elemento ficar visível com timeout customizado
   */
  static waitForElement(selector: string, timeout: number = 10000): void {
    cy.get(selector, { timeout }).should('be.visible')
  }

  /**
   * Limpa todos os cookies e localStorage
   */
  static clearSession(): void {
    cy.clearCookies()
    cy.clearLocalStorage()
  }

  /**
   * Faz um snapshot da página para comparação visual
   */
  static takeSnapshot(name: string): void {
    cy.screenshot(name)
  }

  /**
   * Simula um delay/espera
   */
  static wait(milliseconds: number): void {
    cy.wait(milliseconds)
  }

  /**
   * Verifica se um elemento contém uma classe CSS específica
   */
  static shouldHaveClass(selector: string, className: string): void {
    cy.get(selector).should('have.class', className)
  }

  /**
   * Verifica se um elemento não contém uma classe CSS específica
   */
  static shouldNotHaveClass(selector: string, className: string): void {
    cy.get(selector).should('not.have.class', className)
  }

  /**
   * Clica em um elemento mesmo se ele estiver coberto por outro
   */
  static forceClick(selector: string): void {
    cy.get(selector).click({ force: true })
  }

  /**
   * Digita texto com delay entre as teclas
   */
  static typeSlowly(selector: string, text: string, delay: number = 100): void {
    cy.get(selector).type(text, { delay })
  }

  /**
   * Verifica se uma URL contém um parâmetro específico
   */
  static shouldHaveUrlParam(param: string, value?: string): void {
    cy.url().should('include', param)
    if (value) {
      cy.url().should('include', `${param}=${value}`)
    }
  }

  /**
   * Rola a página até um elemento específico
   */
  static scrollToElement(selector: string): void {
    cy.get(selector).scrollIntoView()
  }

  /**
   * Verifica se um input tem um valor específico
   */
  static shouldHaveValue(selector: string, value: string): void {
    cy.get(selector).should('have.value', value)
  }
}