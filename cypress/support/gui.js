import { faker } from '@faker-js/faker/locale/en'

Cypress.Commands.add('gui_fillSignupFormAndSubmit', (email, password) => {
  email = email || `${faker.string.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
  password = password || Cypress.env('USER_PASSWORD')

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/signup')

  cy.get('#email').type(email)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()

  cy.get('#confirmationCode').should('be.visible')

  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: email
  }).then(message => {

    const confirmationCode = message.html.body.match(/\d{6}/)[0]
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

    cy.wait('@getNotes')
  })
})

Cypress.Commands.add('gui_fillSettingsFormAndSubmit', () => {
  cy.visit('/settings')
  cy.get('#storage').type('1')
  cy.get('#name').type('Mary Doe')
  cy.iframe('.card-field iframe')
    .as('iframe')
    .find('[name="cardnumber"]')
    .type('4242424242424242')
  cy.get('@iframe')
    .find('[name="exp-date"]')
    .type('1271')
  cy.get('@iframe')
    .find('[name="cvc"]')
    .type('123')
  cy.get('@iframe')
    .find('[name="postal"]')
    .type('12345')
  cy.contains('button', 'Purchase').click()
})

Cypress.Commands.add('gui_login', (
  _email = Cypress.env('USER_EMAIL'),
  _password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/login')

  cy.get('#email').type(_email)
  cy.get('#password').type(_password, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@getNotes')
})

Cypress.Commands.add('gui_logout', () => {
  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/')
  cy.wait('@getNotes')

  // if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
  //   cy.get('.navbar-toggle.collapsed')
  //     .should('be.visible')
  //     .click()
  // }

  cy.contains('.nav a', 'Logout').click()
})

Cypress.Commands.add('gui_createNote', (noteDescription, attachFile = false) => {
  cy.visit('/notes/new')

  noteDescription = noteDescription || faker.lorem.words(5)
  cy.get('#content').type(noteDescription)

  if (attachFile) attachFileHandler()

  cy.contains('button', 'Create').click()
  cy.contains('.list-group-item', noteDescription).should('be.visible')
})

Cypress.Commands.add('gui_editNote', (oldNoteDescription, newNoteDescription, attachFile = false) => {
  cy.intercept('GET', '**/notes/**').as('getNote')

  cy.contains('.list-group-item', oldNoteDescription).click()
  cy.wait('@getNote')

  cy.get('#content')
    .as('contentField')
    .clear()
  cy.get('@contentField')
    .type(newNoteDescription)

  if (attachFile) attachFileHandler()

  cy.contains('button', 'Save').click()

  cy.contains('.list-group-item', newNoteDescription).should('be.visible')
  cy.contains('.list-group-item', oldNoteDescription).should('not.exist')
})

Cypress.Commands.add('gui_deleteNote', noteDescription => {
  cy.contains('.list-group-item', noteDescription).click()
  cy.contains('button', 'Delete').click()

  cy.get('.list-group-item')
    .its('length')
    .should('be.at.least', 1)
  cy.contains('.list-group-item', noteDescription)
    .should('not.exist')
})

const attachFileHandler = (filePath = 'cypress/fixtures/example.json') => {
  cy.get('#file').selectFile(filePath)
}
