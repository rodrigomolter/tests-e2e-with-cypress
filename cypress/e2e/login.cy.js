describe('Login', () => {
  it('Sucessfully logs in', () => {
    cy.gui_login()
    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.contains('a', 'Create a new note').should('be.visible')

  })
})