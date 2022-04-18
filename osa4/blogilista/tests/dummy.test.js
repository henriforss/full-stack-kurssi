/* Tests for utils/listHelper.dummy. */

/* Import function to test. */
const listHelper = require("../utils/list_helper")

/* Create unit test for dummy. */
test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})