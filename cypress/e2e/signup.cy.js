/// <reference path="../support/commands.d.ts" />
import { faker } from '@faker-js/faker/locale/en'

describe('Sign up', () => {
  const emailAddress = `${faker.string.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
  it('successfully signs up using confirmation code sent via email', () => {
    cy.gui_fillSignupFormAndSubmit(emailAddress)
    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.contains('a', 'Create a new note').should('be.visible')
  })
})