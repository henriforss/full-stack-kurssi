/* E2E testing with Cypress */

/* Test no.1. */
describe("Blog app", function() {
  /* Define beforeEach: reset db, create test user. */
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Test User",
      username: "testuser1000",
      password: "test",
    }
    cy.request("POST", "http://localhost:3000/api/users/", user)
    cy.visit("http://localhost:3000")

  })

  /* Test no.1.1 */
  it("Login form is shown", function() {
    cy.contains("Log in to application")

  })

  /* Test no.1.2. */
  it("Login is unsuccesful", function() {
    cy.get("#username").type("testuser1000")
    cy.get("#password").type("wrongpwd")
    cy.get("#login-button").click()

    cy.get(".error").contains("Wrong username or password")
    cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")
  })

  /* Test no.1.3. */
  it("Login is succesful", function() {
    cy.get("#username").type("testuser1000")
    cy.get("#password").type("test")
    cy.get("#login-button").click()

    cy.get("html").contains("Test User logged in")
  })

  /* Test no.1.4. */
  describe("When logged in", function() {
    /* Define beforeEach: log in user and save in localStorage to avoid
    working with UI every time. */
    beforeEach(function() {
      /* Use custom login-command defined in "./cypress/support/commands.js" */
      cy.login({ username: "testuser1000", password: "test" })
    })

    /* Test no.1.4.1. */
    it("Create new blog", function() {
      cy.get("#newblog-button").click()

      cy.get("#title").type("Cypress is great for E2E testing")
      cy.get("#author").type("Test Expert")
      cy.get("#url").type("www.testing.com")
      cy.get("#create-button").click()

      cy.get(".success").contains("Blog added")

      cy.get("#list-blogs").contains("Cypress is great for E2E testing")
    })

    /* Test no.1.4.2. */
    it("Like button adds like", function() {
      /* Use custom command to create new blog post for testing. */
      cy.createNewBlog({
        title: "This blog was created automatically",
        author: "Mechanic Mike",
        url: "http://www.automatedtesting.com"
      })

      cy.get("#show-details").click()
      cy.contains("http://www.automatedtesting.com")
      cy.get(".likes").contains("Likes: 0")
      cy.get("#like-button").click()
      cy.get(".likes").contains("Likes: 1")
    })

    /* Test no.1.4.3. */
    it("User can delete blog", function() {
      /* Use custom command to create new blog. */
      cy.createNewBlog({
        title: "This blog will be deleted",
        author: "Derek Delete",
        url: "http://www.notexisting.com"
      })

      cy.get("#show-details").click()
      cy.get("html").contains("http://www.notexisting.com")
      cy.get("#delete-button").click()
      cy.wait(500) // Needs to wait a while so that the delete-request is processed
      cy.get("html").should("not.contain", "http://www.notexisting.com")
    })
  })
})

/* Test no.2. */
describe("When logged in", function() {
  /* Define beforeEach. */
  beforeEach(function() {
    /* Reset database. */
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    /* Create new user. */
    cy.createUser({
      name: "Automatic Man",
      username: "autouser",
      password: "test"
    })

    /* Login new user. */
    cy.login({ username: "autouser", password: "test" })

    /* Create two new blogs. */
    cy.createNewBlog({
      title: "This blog has few likes",
      author: "Min Popular",
      url: "http://www.nolikes.com",
      likes: 50
    })
    cy.createNewBlog({
      title: "This blog has lots of likes",
      author: "Max Popular",
      url: "http://www.popular.com",
      likes: 100
    })
  })

  /* Test no.2.1. */
  it("Blogs are sorted according to likes", function() {
    // cy.visit("http://localhost:3000")
    cy.wait(500)
    // cy.get("#list-blogs")
    cy.get(".blog-element").eq(0).should("contain", "This blog has lots of likes")
    cy.get(".blog-element").eq(1).should("contain", "This blog has few likes")
  })
})