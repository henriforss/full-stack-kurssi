/* A helper for testing. */

/* Define testarray for blogs-api. */
const initialBlogs = [
  {
    title: "Testblog 1",
    author: "Author 1",
    url: "http://www.test1.com/",
    likes: 6,
  },
  {
    title: "Testblog 2",
    author: "Author 2",
    url: "http://www.test2.com/",
    likes: 3,
  },
  {
    title: "Testblog 3",
    author: "Author 3",
    url: "http://www.test3.com/",
    likes: 12,
  },
  {
    title: "Testblog 4",
    author: "Author 4",
    url: "http://www.test4.com/",
    likes: 1,
  },
]

/* Define testarray for users-api. */
const initialUsers = [
  {
    username: "testuser1",
    name: "Test User",
    password: "test",
  },
  {
    username: "testuser2",
    name: "Test User",
    password: "test",
  },
  {
    username: "testuser3",
    name: "Test User",
    password: "test",
  },
  {
    username: "testuser4",
    name: "Test User",
    password: "test",
  },
]

/* Export modules. */
module.exports = {
  initialBlogs,
  initialUsers,
}
