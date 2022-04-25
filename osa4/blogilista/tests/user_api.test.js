/* Integration tests for /api/users. */

/* Require necessary modules. */
const { beforeEach, test, describe, expect } = require("@jest/globals")
const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../app")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

/* Define beforeEach. Delete all users and create new ones. */
beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

/* Test suite no.1. */
describe("Create user", () => {
  /* Test no.1.1. */
  test("require username", async () => {
    /* Create a user without username. */
    const newUser = {
      username: "",
      name: "Test User",
      password: "test",
    }

    /* Post newUser to server and expect error. */
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    /* Log error.text. */
    console.log(result.error.text)

    /* Make sure that number of users is same. */
    const usersAtStart = helper.initialUsers
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  /* Test no.1.2. */
  test("require password", async () => {
    /* Create a user without password. */
    const newUser = {
      username: "testuser5",
      name: "Test User",
      password: "",
    }

    /* Post newUser to server and expect error. */
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    /* Log error.text. */
    console.log(result.error.text)

    /* Make sure that number of users is same. */
    const usersAtStart = helper.initialUsers
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  /* Test no.1.3. */
  test("username taken", async () => {
    /* Create a user with existing username. */
    const newUser = {
      username: "testuser4",
      name: "Username Taken",
      password: "test",
    }

    /* Post newUser to server and expect error. */
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    /* Log error.text. */
    console.log(result.error.text)

    /* Make sure that number of users is same. */
    const usersAtStart = helper.initialUsers
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  /* Test no.1.4. */
  test("password too short", async () => {
    /* Create a user with invalid password. */
    const newUser = {
      username: "testuser5",
      name: "Invalid Password",
      password: "ab",
    }

    /* Post newUser to server and expect error. */
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    /* Log error.text. */
    console.log(result.error.text)

    /* Make sure that number of users is same. */
    const usersAtStart = helper.initialUsers
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  /* Test no.1.5. */
  test("valid user added", async () => {
    /* Create a valid user. */
    const newUser = {
      username: "testuser5",
      name: "Valid User",
      password: "test",
    }

    /* Post newUser to server and expect error. */
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    /* Log error.text. */
    console.log(result.body)

    /* Make sure that number of users is same. */
    const usersAtStart = helper.initialUsers
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })
})

/* Make sure to close connection */
afterAll(async () => {
  await mongoose.connection.close()
})
