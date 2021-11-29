describe('Blog app', function() {

  it('all data can be cleaned out of localstorage',  function() {
    cy.request('POST', 'http://localhost:3003/testing/reset')
  })

  it('user can be added',  function() {
    const user = {
      name: 'lukas',
      username: 'lukas',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/users/', user)
  })

  it('front page can be opened',  function() {
    cy.visit('http://localhost:3000')
    cy.contains('blog app, lukas vidfar 2021')
  })

  it('blogform is not visible when not logged in', function() {
    cy.contains('add a new blog').should('not.exist')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('created user can log in', function() {
    cy.get('#inputUsername').type('lukas')
    cy.get('#inputPassword').type('password')
    cy.get('#btnLogin').click()
    cy.contains('welcome lukas')
    cy.contains('blogs')
    cy.get('create').should('not.exist')
  })

  it('blog form can be opened and blog can be created', function(){
    cy.get('.btnTogglableShow').click()
    cy.get('#inputTitle').type('hello, this is my first blog')
    cy.get('#inputAuthor').type('lukas')
    cy.get('#inputUrl').type('url.com')
    cy.get('#btnCreateBlog').click()
    cy.contains('added to list of blogs')
  })

  it('user can be logged out', function() {
    cy.get('#btnLogout').click()
    cy.contains('log in')
  })

  it('blogs are visible when logged out', function() {
    cy.contains('hello, this is my first blog')
  })

  it('blogs cannot be created when not logged in', function() {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: '/blogs',
      body: {
        title: 'shouldnotwork',
        author: 'password123',
        url: 'url'
      },
    }).then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.status).to.eq(401)
      })
  })

  it('blogs cannot be deleted when not logged in', function() {
    cy.contains('show more').click()
    cy.contains('delete').click()
    cy.contains('error')
  })

  it('another user can be added',  function() {
    const user = {
      name: 'firstName',
      username: 'firstUsername',
      password: 'firstPassword'
    }
    cy.request('POST', 'http://localhost:3003/users/', user)
  })

  it('another created user can log in', function() {
    cy.contains('log in').click()
    cy.get('#inputUsername').type('firstUsername')
    cy.get('#inputPassword').type('firstPassword')
    cy.get('#btnLogin').click()
    cy.contains('welcome firstUsername')
    cy.contains('blogs')
    cy.get('create').should('not.exist')
  })

  it('blog form can be opened and blog can be created', function(){
    cy.contains('add a new blog').click()
    cy.get('#inputTitle').type('this is my second blog')
    cy.get('#inputAuthor').type('firstUsername')
    cy.get('#inputUrl').type('url.com')
    cy.get('#btnCreateBlog').click()
    cy.contains('added to list of blogs')
  })

  it('blogs can be opened so author and url is visible', function() {
    cy.contains('show more').click({ force:true })
    cy.get('.btnTogglableShow').click({ multiple:true,force:true })
    cy.contains('read more at url.com')
    cy.contains('written by lukas')
    cy.contains('written by firstUsername')
  })

  it('likes button be clicked and it updates the likes', function() {
    cy.contains('hello, this is my first blog | 0 likes')
    cy.wait(2000)
    cy.get('#likeButton').click()
    cy.wait(2000)
    cy.get('#likeButton').click()
    cy.contains('hello, this is my first blog | 1 likes')
  })

  it('Compare the sequence of blog likes', function () {
    cy.contains('written by firstUsername').find('button').click()
    cy.contains('written by firstUsername').find('button').click()
    cy.contains('written by firstUsername').find('button').click()
    cy.wait(2000)
    cy.contains('written by firstUsername').find('button').click()
    cy.contains('written by firstUsername').find('button').click()
  })

  it('should be sorted by likes', () => {
    cy.get('li').should(($li) =>
      expect($li.first()).to.contain('second')
    )
  })


})