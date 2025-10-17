/// <reference types="cypress" />

describe('Weather Page', () => {
  localStorage.setItem('userName','mahdi') // in order to prevent the enter userName force function
  beforeEach(() => {
    cy.intercept('GET', 'https://api.open-meteo.com/**', {
      statusCode: 200,
      body: {
        current_weather: {
          temperature: 22,
          weathercode: 1
        }
      }
    }).as('fetchWeather')

    cy.visit('http://localhost:3000/weather')
  })

  it('should fetch and display weather data after selecting a city', () => {
    localStorage.setItem('userName','mahdi') // in order to prevent the enter userName force function
    cy.get('.v-autocomplete input')
      .type('Tehran', { force: true })

    cy.contains('.v-list-item', 'Tehran').click({ force: true })

// Check spinner exists (not necessarily visible)
    cy.get('.v-progress-circular', { timeout: 10000 }).should('exist')

    cy.wait('@fetchWeather')

// Assert weather result card appears
    cy.contains('Search Result', { matchCase: false }).should('be.visible')

// Assert city name inside the RESULT CARD, NOT the autocomplete
    cy.get('.v-card').within(() => {
      cy.contains('Tehran').should('be.visible')
    })

// Optionally assert temperature if you know the mock value
    cy.contains('22').should('be.visible')
  })
})
