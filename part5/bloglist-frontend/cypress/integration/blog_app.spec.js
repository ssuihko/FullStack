describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')    
        const user = {      
            name: 'Matti Luukkainen',      
            username: 'mluukkai',      
            password: 'salainen'    }    
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
    })

    // 5.17 login form is shown
    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function() {

        // 5.18 login works
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('Matti Luukkainen logged in')
        })
    
        // 5.18 login fails 
        it('fails with wrong credentials', function() {
            cy.get('#username').type('enolekayttaja')
            cy.get('#password').type('sesamsulkeudu')
            cy.get('#login-button').click()
            cy.get('.error').contains('wrong credentials')
    
            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
        })

        it('logout works', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('Matti Luukkainen logged in')
            cy.get('#logout-button').click()
            cy.contains('login')
        })
    })

    describe('Create blog when logged in', function() {

        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        })

        it('front page can be opened', function() {
            cy.contains('Matti Luukkainen logged in')
            cy.contains('Blogs')
            cy.contains('Create new Blog')
            cy.contains('Blog list') 
        })

        // 5.19 Blog can be created. Testin tulee varmistaa näkyvyys
        // blogien listalla
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('cypress title')
            cy.get('#author').type('cypress author')
            cy.get('#url').type('https://www.cypressurl.com')
            cy.get('#button-create').click()
            cy.reload()
            cy.get('#view-button').click()
            cy.contains('cypress title cypress author')
        })

    })

    describe('Interact with blog when logged in', function() {

        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('new blog').click()
            cy.get('#title').type('cypress title')
            cy.get('#author').type('cypress author')
            cy.get('#url').type('https://www.cypressurl.com')
            cy.get('#button-create').click()
            cy.reload()
        })
        
        // 5.20 blog can be liked
        it('A blog can be liked', function() {
            cy.get('#view-button').click()
            cy.get('#like-button').click()
            cy.get('#view-button').click()
            cy.contains('likes 1')
        })
         
        // 5.22 blogs appear in correct order by likes
        it('The blogs appear in correct order from the most to least liked', function() {
            
            cy.get('#view-button').click()
            cy.get('#like-button').click()
            
            cy.contains('new blog').click()
            cy.get('#title').type('cypress title 2')
            cy.get('#author').type('cypress author 2')
            cy.get('#url').type('https://www.cypressurl2.com')
            cy.get('#button-create').click()
            cy.reload()

            cy.get('.blog')
                .contains('cypress author 2')
                .contains('view')
                .click()

            cy.get('.blog').then(blogs => {
                cy.get(blogs[1]).contains('like').click()
            })

            cy.get('.blog')
                .contains('cypress author 2')
                .contains('view')
                .click()

            cy.get('.blog').then(blogs => {
                cy.get(blogs[1]).contains('like').click()
            })

            cy.get('.blog').then(blogs => {
                cy.get(blogs[0]).contains('view').click()
                cy.get(blogs[1]).contains('view').click()
            })

            cy.get('.blog').then( blogs => {
                expect(blogs[0]).to.contain.text('cypress title 2')
                expect(blogs[1]).to.contain.text('cypress title')
            })
        })

        // 5.21 user can delete a blog
        it('A blog can be deleted by the creator', function() {
            cy.get('#view-button').click()
            cy.get('#delete-button').click()
            cy.get('html').should('not.contain', 'cypress title')
        
        })
    })
})