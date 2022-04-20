/* Tests for blogilista api. */

/* Require necessary modules. */
const { test, expect, afterAll, beforeEach } = require("@jest/globals")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

/* Define beforeEach for each test.
Delete all entries and insert test-entries. */
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

/* Test no.1. */
test("make sure GET returns all entries", async () => {
  const blogs = await Blog.find({})
  expect(blogs).toHaveLength(4)
})

/* Test no.2. */
test("entries are type application/json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

/* Test no.3. */
test("every entry has an id", async () => {
  const blogs = await Blog.find({})
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

/* Make sure to close connection */
afterAll(async () => {
  await mongoose.connection.close()
})




