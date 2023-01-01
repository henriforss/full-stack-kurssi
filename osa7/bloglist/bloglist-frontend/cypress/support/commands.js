/* User defined commands. */

/* Create new user. */
Cypress.Commands.add("createUser", ({ name, username, password }) => {
  const user = {
    name,
    username,
    password,
  };
  cy.request("POST", "http://localhost:3000/api/users/", user);
  cy.visit("http://localhost:3000");
});

/* Log in. */
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "/api/login/", {
    username,
    password,
  }).then((response) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(response.body));
    cy.visit("http://localhost:3000/");
  });
});

/* Create new blog. */
Cypress.Commands.add("createNewBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: "http://localhost:3000/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedBlogappUser")).token
      }`,
    },
  });
  cy.visit("http://localhost:3000/");
});
