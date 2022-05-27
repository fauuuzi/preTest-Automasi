describe('testcase ke2', () => {

    const userName = 'locked_out_user'
    const passWord = 'secret_sauce'

    it('Goto URL', () => {
        cy.visit('https://www.saucedemo.com')
    })

    it('Login User', () => {

        cy.get('#user-name').type(`${userName}`)
        cy.get('#password').type(`${passWord}`)
        cy.get('.submit-button').click()

    })

})