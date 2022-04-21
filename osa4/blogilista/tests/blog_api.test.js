/* Tests for blogilista api. */

/* Require necessary modules. */
const { test, expect, afterAll, beforeEach, describe } = require("@jest/globals")
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

  /* Return all blogs into variable and expect variable to 
  have certain length. */
  const blogs = await Blog.find({})
  expect(blogs).toHaveLength(4)
})

/* Test no.2. */
test("entries are type application/json", async () => {

  /* Make a get request to supertest and expect status code 200
  and Content-Type application/json. */
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

/* Test no.3. */
test("every entry has an id", async () => {

  /* Get all blogs into variable. Then use forEach to check
  that each blog has a key called "id". Note: They don't, but
  Mongoose uses "id" as a virtual getter, which makes the 
  test pass although it should not. */
  const blogs = await Blog.find({})
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

/* Test no.4. */
test("make sure POST requests are succesful", async () => {
  
  /* Create a new blog for testing. */
  const newBlog = {
    title: "Posting Blogs",
    url: "http://http-posting-for-dummies/",
    author: "Peter Postman",
    likes: 8
  }

  /* Use supertest to do POST-request, send blog post,
  expect an answer, and expect a content-type. */
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
    
  /* Check that number of blogs in database increases by one. */
  const blogsAtStart = helper.initialBlogs
  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

  /* Check that new blog is in database. */
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain(newBlog.title)

})

/* Test no.5. */
test("POST-requests with likes value undefined get likes value zero",
  async () => {

  /* Create a new blog with likes undefined. */
  const newBlog = {
    title: "Nobody likes this blog",
    author: "Lisa Nolike",
    url: "http://www.zerolikes.com/",
  }

  /* Post newBlog to server and expect status 201, "created". */
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
  
  /* Use Blog to search for newBlog, and make sure
  likes value is 0. */
  const blog = await Blog.find(newBlog)
  expect(blog[0].likes).toBe(0)

})

/* Test no.6. */
describe.only("server returns 400", () => {

  /* Test no.6.1. */
  test("when POST-requests lacks key 'url'", async () => {

    /* Create new blog with no url. */
    const noUrl = {
      title: "This one has no url",
      author: "Forgetful Frank",
      likes: 5
    }

    /* POST-request, send new blog, and expect status 400, "bad request". */
    await api
      .post("/api/blogs")
      .send(noUrl)
      .expect(400)
  })

  /* Test no.6.2. */
  test("when POST-request lacks key 'title'", async () => {

    const noTitle = {
      author: "No Title",
      url: "http://www.notitleonthisone.com/",
      likes: 3
    }

    await api
      .post("/api/blogs")
      .send(noTitle)
      .expect(400)
  })

  /* Test no.6.3. */
  test("when POST-request lacks both 'url' and 'title'", async () => {

    const noTitleOrUrl = {
      author: "No Nothing",
      likes: 2
    }

    await api
      .post("/api/blogs")
      .send(noTitleOrUrl)
      .expect(400)
  })

})







/* Make sure to close connection */
afterAll(async () => {
  await mongoose.connection.close()
})




