/* E2E testing with Cypress */

/* Describe tests. */
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

  /* Test no.1. */
  it("Login form is shown", function() {
    cy.contains("Log in to application")

  })

  /* Test no.2. */
  it("Login is unsuccesful", function() {
    cy.get("#username").type("testuser1000")
    cy.get("#password").type("wrongpwd")
    cy.get("#login-button").click()

    cy.get(".error").contains("Wrong username or password")
    cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")
  })

  /* Test no.3. */
  it("Login is succesful", function() {
    cy.get("#username").type("testuser1000")
    cy.get("#password").type("test")
    cy.get("#login-button").click()

    cy.get("html").contains("Test User logged in")
  })

  /* Test no.4. */
  describe("When logged in", function() {
    /* Define beforeEach: log in user and save in localStorage to avoid
    working with UI every time. */
    beforeEach(function() {
      cy.request("POST", "/api/login/", {
        username: "testuser1000",
        password: "test"
      }).then(response => {
        localStorage.setItem("loggedBlogappUser", JSON.stringify(response.body))
        cy.visit("http://localhost:3000/")
      })
    })

    /* Test no.4.1. */
    it("Create new blog", function() {
      cy.get("#newblog-button").click()

      cy.get("#title").type("Cypress is great for E2E testing")
      cy.get("#author").type("Test Expert")
      cy.get("#url").type("www.testing.com")
      cy.get("#create-button").click()

      cy.get(".success").contains("Blog added")

      cy.get("#list-blogs").contains("Cypress is great for E2E testing")
    })

    // /* Test no.4.2. */
    // it.only("Like button adds like", function() {

    //   JATKA TÄSTÄ: tee erillinen komento muistiinpanon lisäämiselle. Tehtävä 5.20.

    // })
  })
})