Cypress.Commands.add('sessionLogin', (
  _email = Cypress.env('USER_EMAIL'),
  _password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.gui_login(_email, _password)
  cy.session(_email, login)
})