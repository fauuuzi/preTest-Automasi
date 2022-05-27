describe('testcase ke3', () => {

    const userName = 'problem_user'
    const passWord = 'secret_sauce'

    //Pilihan Filter
    //const Filterdata = 'Name (A to Z)'
    //const Filterdata = 'Name (Z to A)'
    //const Filterdata = 'Price (low to high)'
    const Filterdata = 'Price (high to low)'
    
    //Product name
    //const Productname = 'Sauce Labs Backpack'
    //const Productname = 'Sauce Labs Bike Light'
    //const Productname = 'Sauce Labs Bolt T-Shirt'
    const Productname = 'Sauce Labs Fleece Jacket'
    //const Productname = 'Sauce Labs Onesie'
    const Productname2 = 'Test.allTheThings() T-Shirt (Red)'

    //Chechout Information
    const firstName = 'Fauzi'
    const lastName = 'Test'
    const zip = '15151'

    it('Goto URL', () => {
        cy.visit('https://www.saucedemo.com')
    })

    it('Login User', () => {

        cy.get('#user-name').type(`${userName}`)
        cy.get('#password').type(`${passWord}`)
        cy.get('.submit-button').click()

    })

    it('Chosee Product by name', () =>  {

        cy.get('.product_sort_container').select(`${Filterdata}`)

        cy.get('.inventory_item_name').contains(`${Productname}`).click()

        // Re-login
        cy.get('.error-button').click()
        cy.get('#user-name').type(`${userName}`)
        cy.get('#password').type(`${passWord}`)
        cy.get('.submit-button').click().wait(2000)

        //Ketika ingin mengklik product berdasarkan nama product & add to cart 
        cy.get('.inventory_item_name').contains(`${Productname}`).click()
        cy.get('.btn_inventory').click()

        //Cek btn fungsi Remove & add to cart lagi
        cy.get('button').contains('Remove').click()
        cy.get('.btn_inventory').click()
        cy.get('.inventory_details_back_button').click()
  
        cy.get('.inventory_item_name').contains(`${Productname2}`).click()
        cy.get('.btn_inventory').click()
        cy.get('.inventory_details_back_button').click()


        cy.get('.bm-burger-button').click()
        cy.get('#reset_sidebar_link').click()

        //Add product again
        cy.get('.inventory_item_name').contains(`${Productname2}`).click()
        cy.get('.btn_inventory').click()
        cy.get('.inventory_details_back_button').click()

        //To cart
        cy.get('.shopping_cart_link').click()
        cy.get('.checkout_button').click()

    })

    it('Checkout Until Finish', () =>  {

        cy.get('.checkout_info').within(() => {
            cy.get('#first-name').type(`${firstName}`)
            cy.get('#last-name').type(`${lastName}`)
            cy.get('#postal-code').type(`${zip}`)
        })
        cy.get('#continue').click()
        
        cy.get('.error-button').click()
        cy.get('#user-name').type(`${userName}`)
        cy.get('#password').type(`${passWord}`)
        cy.get('.submit-button').click().wait(2000)
        //product yang sudah di keranjang hilang ketika login kembali setelah auto kelogout

        cy.get('.inventory_item_name').contains(`${Productname2}`).click()
        cy.get('.btn_inventory').click()
        cy.get('.inventory_details_back_button').click()

        cy.get('.shopping_cart_link').click()
        cy.get('.checkout_button').click()

        cy.get('.checkout_info').within(() => {
            cy.get('#first-name').type(`${firstName}`)
            cy.get('#last-name').type(`${lastName}`)
            cy.get('#postal-code').type(`${zip}`)
        })
        cy.get('#continue').click()
    })

    it('Loout User', () => {

        cy.get('.bm-burger-button').click()
        cy.get('#logout_sidebar_link').click()
  
    })

})