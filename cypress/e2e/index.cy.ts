/// <reference types="cypress" />

describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    localStorage.removeItem('userName') // Ensure a clean state before each test
  })

  it('should display the current time without seconds', () => {
    cy.get('h1').invoke('text').then((timeText) => {
      expect(timeText).to.match(/^\d{2}:\d{2}$/)
    })
  })

  it('should display the correct greeting after saving a name', () => {
    const currentHour = new Date().getHours()
    const testName = 'Mahdi'

    // Type the name and save
    cy.get('input').type(testName)
    cy.contains('button', /save/i).click()

    cy.get('h2').invoke('text').then((text) => {
      if (currentHour < 12) {
        expect(text).to.include('Good morning')
      } else if (currentHour === 12) {
        expect(text).to.include('Good noon')
      } else {
        expect(text).to.include('Good afternoon')
      }
      expect(text).to.include(testName)
    })
  })

  it('should load the saved username from localStorage', () => {
    const testName = 'Fatemeh'
    localStorage.setItem('userName', testName)
    cy.reload()

    cy.get('h2').should('contain', testName)
  })

  it('should disable save button when input is empty', () => {
    cy.contains('button', /save/i).should('be.disabled')
  })

  it('should enable save button after typing and save to localStorage', () => {
    const testName = 'Sara'

    cy.get('input').type(testName)
    cy.contains('button', /save/i).should('not.be.disabled').click()

    cy.window().its('localStorage.userName').should('eq', testName)
  })
})
