/// <reference types="cypress" />

describe('Profile Settings Page', () => {

  beforeEach(() => {
    localStorage.setItem('userName','mahdi') // in order to prevent the enter userName force function
    cy.visit('http://localhost:3000/profile')
  })

  it('should show validation errors when username is empty', () => {
    cy.get('[data-testid="username-input"] input').clear()
    cy.get('[data-testid="save-btn"]').click()
    cy.contains(/required|validation/i).should('exist')
  })

  it('should show validation error for short username', () => {
    cy.get('[data-testid="username-input"] input').clear().type('A')
    cy.get('[data-testid="save-btn"]').click()
    cy.contains(/2|length/i).should('exist')
  })

  it('should save valid username, theme and language', () => {
    cy.get('[data-testid="username-input"] input').clear().type('Mahdi')

    cy.get('[data-testid="theme-select"]').click()
    cy.contains(/dark/i).click()

    cy.get('[data-testid="lang-select"]').click()
    cy.contains(/fa|persian/i).click()

    cy.get('[data-testid="save-btn"]').click()

    cy.window().then((win) => {
      expect(win.localStorage.getItem('userName')).to.equal('Mahdi')
      expect(win.localStorage.getItem('theme')).to.equal('dark')
      expect(win.localStorage.getItem('lang')).to.equal('fa')
    })
  })

})
