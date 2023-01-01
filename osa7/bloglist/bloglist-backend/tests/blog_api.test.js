/* Integration (?) tests for blogilista api. */

/* Require necessary modules. */
const { test, expect, afterAll, beforeEach, describe } = require("@jest/globals")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

/* Define beforeEach for each test.
Delete all entries and insert test-entries. */
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
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
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

/* Test no.4. */
test("make sure POST requests are succesful", async () => {
  /* Create newUser and save in databse. */
  const newUser = {
    username: "testuser5",
    name: "Test User",
    password: "test",
  }

  await api
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send(newUser)
    .expect(201)

  /* Log in to get token. */
  const user = {
    username: "testuser5",
    password: "test",
  }

  const result = await api
    .post("/api/login")
    .send(user)

  let { token } = result.body
  token = `Bearer ${token}`
  console.log(token)

  /* Create a new blog for testing. */
  const newBlog = {
    title: "Posting Blogs",
    url: "http://http-posting-for-dummies.com/",
    author: "Peter Postman",
    likes: 8,
  }

  /* Use supertest to do POST-request, send blog post,
  expect an answer, and expect a content-type. */
  const result2 = await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  console.log(result2.text)

  /* Check that number of blogs in database increases by one. */
  const blogsAtStart = helper.initialBlogs
  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

  /* Check that new blog is in database. */
  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain(newBlog.title)
})

/* Test no.5. */
test("POST-requests with likes value undefined get likes value zero", async () => {
  /* Create newUser and save in databse. */
  const newUser = {
    username: "testuser5",
    name: "Test User",
    password: "test",
  }

  await api
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send(newUser)
    .expect(201)

  /* Log in to get token. */
  const user = {
    username: "testuser5",
    password: "test",
  }

  const result = await api
    .post("/api/login")
    .send(user)

  let { token } = result.body
  token = `Bearer ${token}`

  console.log(token)

  /* Create a new blog with likes undefined. */
  const newBlog = {
    title: "Nobody likes this blog",
    author: "Lisa Nolike",
    url: "http://www.zerolikes.com/",
  }

  /* Post newBlog to server and expect status 201, "created". */
  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(201)

  /* Use Blog to search for newBlog, and make sure
  likes value is 0. */
  const blog = await Blog.find(newBlog)
  expect(blog[0].likes).toBe(0)
})

/* Test no.6. */
describe("server returns 400", () => {
  /* Test no.6.1. */
  test("when POST-requests lacks key 'url'", async () => {
    /* Create newUser and save in databse. */
    const newUser = {
      username: "testuser5",
      name: "Test User",
      password: "test",
    }

    await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect(201)

    /* Log in to get token. */
    const user = {
      username: "testuser5",
      password: "test",
    }

    const result = await api
      .post("/api/login")
      .send(user)

    let { token } = result.body
    token = `Bearer ${token}`

    console.log(token)

    /* Create new blog with no url. */
    const noUrl = {
      title: "This one has no url",
      author: "Forgetful Frank",
      likes: 5,
    }

    /* POST-request, send new blog, and expect status 400, "bad request". */
    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(noUrl)
      .expect(400)

    /* Make sure blog was not added by getting all blogs before and after
    POST-request and comparing lengths. */
    const blogsAtStart = helper.initialBlogs
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  /* Test no.6.2. */
  test("when POST-request lacks key 'title'", async () => {
    /* Create newUser and save in databse. */
    const newUser = {
      username: "testuser5",
      name: "Test User",
      password: "test",
    }

    await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect(201)

    /* Log in to get token. */
    const user = {
      username: "testuser5",
      password: "test",
    }

    const result = await api
      .post("/api/login")
      .send(user)

    let { token } = result.body
    token = `Bearer ${token}`

    console.log(token)

    const noTitle = {
      author: "No Title",
      url: "http://www.notitleonthisone.com/",
      likes: 3,
    }

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(noTitle)
      .expect(400)

    const blogsAtStart = helper.initialBlogs
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  /* Test no.6.3. */
  test("when POST-request lacks both 'url' and 'title'", async () => {
    /* Create newUser and save in databse. */
    const newUser = {
      username: "testuser5",
      name: "Test User",
      password: "test",
    }

    await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect(201)

    /* Log in to get token. */
    const user = {
      username: "testuser5",
      password: "test",
    }

    const result = await api
      .post("/api/login")
      .send(user)

    let { token } = result.body
    token = `Bearer ${token}`

    console.log(token)

    const noTitleOrUrl = {
      author: "No Nothing",
      likes: 2,
    }

    await api
      .post("/api/blogs")
      .send(noTitleOrUrl)
      .set("Authorization", token)
      .expect(400)

    const blogsAtStart = helper.initialBlogs
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})

/* Test no.7. */
describe("a single blog", () => {
  /* Test no.7.1. */
  test("can be deleted", async () => {
    /* Create newUser and save in databse. */
    const newUser = {
      username: "testuser5",
      name: "Test User",
      password: "test",
    }

    await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect(201)

    /* Log in to get token. */
    const user = {
      username: "testuser5",
      password: "test",
    }

    const result = await api
      .post("/api/login")
      .send(user)

    let { token } = result.body
    token = `Bearer ${token}`

    console.log(token)

    /* Create a new blog to be deleted later. */
    const newBlog = {
      title: "How to delete blogs",
      author: "Danny Deleter",
      url: "http://wwww.deleteme.com/",
      likes: 9,
    }

    /* Make POST-request and send newBlog, expect status code 201. */
    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect(201)

    /* Find newBlog id in database. */
    const blogToDelete = await Blog.find(newBlog)
    const blogToDeleteId = blogToDelete[0].id

    /* Delete newBlog with blog id. */
    const result2 = await api
      .delete(`/api/blogs/${blogToDeleteId}`)
      .set("Authorization", token)
      .expect(200)

    console.log(result2.body)

    /* Make sure newBlog is no longer in database. */
    const deletedBlog = Blog.findById(blogToDeleteId)
    expect(deletedBlog.id).toBeUndefined()
  })

  /* Test no.7.2. */
  test("can be modified", async () => {
    /* Create newUser and save in databse. */
    const newUser = {
      username: "testuser5",
      name: "Test User",
      password: "test",
    }

    await api
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send(newUser)
      .expect(201)

    /* Log in to get token. */
    const user = {
      username: "testuser5",
      password: "test",
    }

    const result = await api
      .post("/api/login")
      .send(user)

    let { token } = result.body
    token = `Bearer ${token}`

    console.log(token)

    /* Create a new blog to be modified later. */
    const newBlog = {
      title: "How to modify blogs",
      athor: "Manny Modifier",
      url: "http://www.modifyblog.com/",
      likes: 4,
    }

    /* Make POST-request and send newBlog, expect status code 201. */
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token)
      .expect(201)

    /* Find newBlog id in database. */
    const blogToModify = await Blog.findOne(newBlog)
    const blogToModifyId = blogToModify.id

    /* Make PUT-request to update blog by id. */
    await api
      .put(`/api/blogs/${blogToModifyId}`)
      .send({ likes: 5 })
      .expect(200)

    /* Make sure blog was updated. */
    const updatedBlog = await Blog.findById(blogToModifyId)
    expect(updatedBlog.likes).toBe(5)
  })
})

/* Make sure to close connection */
afterAll(async () => {
  await mongoose.connection.close()
})
