describe('Login ', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })
})
