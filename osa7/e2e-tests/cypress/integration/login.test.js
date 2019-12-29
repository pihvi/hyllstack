describe('After successful login', () => {
  before(() => {
    cy.clock(0)
    cy.visit('http://localhost:3000')
    cy.contains('login')
    cy.contains('blogs').should('not.exist')
    cy.get('input[type=text]')
      .type('qqq')
    cy.get('input[type=password]')
      .type('qqq')
    cy.get('input[type=submit]')
      .click()
  })

  it('login disappears', () => {
    cy.contains('login').should('not.exist')
  })

  it('blogs are displayed', () => {
    cy.contains('blogs')
  })

  it('current date is displayed', () => {
    cy.clock(0)
    cy.contains('It is now Thu Jan 01 1970')
  })
})
