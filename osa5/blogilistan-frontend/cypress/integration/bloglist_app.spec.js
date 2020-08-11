describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      username: 'testRoot',
      password: 'password123',
      name: 'Jere Liimatainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testRoot')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()

      cy.contains('Jere Liimatainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testRoot')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.get('#notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Jere Liimatainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testRoot', password: 'password123' })
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('BlogName')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('testing.fi')
      cy.get('#create-button').click()
      cy.get('#blog').should('contain', 'BlogName Test Author')
    })

    describe('and 3 blogs exist', function() {
      beforeEach(function() {
        cy.addBlog({ title: 'BlogName 1', author: 'Test Author 1', url: 'testing1.fi' })
        cy.addBlog({ title: 'BlogName 2', author: 'Test Author 2', url: 'testing2.fi' })
        cy.addBlog({ title: 'BlogName 3', author: 'Test Author 3', url: 'testing3.fi' })
      })

      it('a blog can be liked', function() {
        cy.contains('BlogName 1').parent().contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('a blog can be removed', function() {
        cy.contains('BlogName 1').parent().contains('view').click()
        cy.contains('BlogName 1').parent().contains('remove').click()
        cy.get('html').should('not.contain', 'BlogName 1')
          .should('contain', 'BlogName 2')
          .should('contain', 'BlogName 3')
      })

      it('blogs should be ordered by likes', function() {
        cy.contains('BlogName 3').parent().contains('view').click()
        cy.contains('BlogName 3').parent().contains('like').click().click().click()
        cy.contains('BlogName 2').parent().contains('view').click()
        cy.contains('BlogName 2').parent().contains('like').click()
        cy.contains('BlogName 1').parent().contains('view').click()
        cy.contains('BlogName 1').parent().contains('like').click().click()

        cy.get('#blog:first').then(function(blog) {
          cy.wrap(blog).as('firstBlog').find('span').should('contain', '3')
          cy.get('@firstBlog').next().as('secondBlog').find('span').should('contain', '2')
          cy.get('@secondBlog').next().find('span').should('contain', '1')
        })
      })


    })
  })
})
