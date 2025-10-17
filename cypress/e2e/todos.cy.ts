/// <reference types="cypress" />

describe('To-Do List Page', () => {

  beforeEach(() => {
    localStorage.setItem('userName','mahdi') // in order to prevent the enter userName force function
    cy.visit('http://localhost:3000/todos')
    localStorage.removeItem('toDoList') // reset list before each test
  })

  it('should add a new task', () => {
    cy.contains('button', /add/i).click()
    cy.get('input').type('Buy milk')
    cy.contains('button', /save/i).click()
    cy.contains('td', 'Buy milk').should('exist')
  })

  it('should edit an existing task', () => {
    // Setup
    localStorage.setItem('toDoList', JSON.stringify([{ text: 'Old Task', done: false }]))
    cy.reload()

    cy.get('[data-testid="edit-btn"]').first().click()
      cy.get('input').clear().type('Updated Task')
    cy.contains('button', /save/i).click()

    cy.contains('td', 'Updated Task').should('exist')
  })

  it('should mark task as done', () => {
    localStorage.setItem('toDoList', JSON.stringify([{ text: 'Task A', done: false }]))
    cy.reload()

    cy.get('[data-testid="done-btn"]').first().click()
    cy.contains('td', 'Task A').should('have.class', 'text-decoration-line-through')
  })

  it('should redo (unmark) a completed task', () => {
    localStorage.setItem('toDoList', JSON.stringify([{ text: 'Task B', done: true }]))
    cy.reload()

    cy.get('[data-testid="redo-btn"]').first().click()
    cy.contains('td', 'Task B').should('not.have.class', 'text-decoration-line-through')
  })

  it('should delete a task', () => {
    localStorage.setItem('toDoList', JSON.stringify([{ text: 'To Delete', done: false }]))
    cy.reload()

    cy.get('[data-testid="delete-btn"]').first().click()
    cy.contains('td', 'To Delete').should('not.exist')
  })

  it('should persist tasks in localStorage', () => {
    cy.contains('button', /add/i).click()
    cy.get('input').type('Persistent Task')
    cy.contains('button', /save/i).click()

    cy.window().its('localStorage.toDoList').should('contain', 'Persistent Task')
  })

})
