describe('my first test !', () => {
    it('makes an assertion', () => {
        cy.visit('https://example.cypress.io');
        cy.contains('type').click();
        cy.url()
            .should('include', '/commands/actions');

        cy.get('.action-email')
            .type('oosacker@gmail.com')
            .should('have.value', 'oosacker@gmail.com');
    })
})