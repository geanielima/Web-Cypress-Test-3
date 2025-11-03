// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@4tw/cypress-drag-drop'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configurações globais
beforeEach(() => {
  // Configurações que devem ser executadas antes de cada teste
})

// Configuração para capturar erros não tratados
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false aqui previne que o Cypress falhe o teste
  // em caso de erro JavaScript não tratado
  console.log('Erro não tratado capturado:', err.message)
  return false
})