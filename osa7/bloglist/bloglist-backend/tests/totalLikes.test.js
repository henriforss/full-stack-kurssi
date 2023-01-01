/* Tests for utils/listHelper.totalLikes. */

/* Import functions to test. */
const listHelper = require("../utils/list_helper")
const testArray = require("./arrays_for_testing")

/* Create unit test for totalLikes. */
describe("total likes", () => {

  /* Short array for testing. */
  const arrayWithOneBlog = testArray.arrayWithSingleObject

  /* Long array for testing. */
  const arrayWithSeveralBlogs = testArray.arrayWithSeveralObjects
  
  /* Test no.1. */
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  /* Test no.2. */
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(arrayWithOneBlog)
    expect(result).toBe(2)
  })

  /* Test no.3. */
  test("of a bigger list is calculated correct", () => {
    const result = listHelper.totalLikes(arrayWithSeveralBlogs)
    expect(result).toBe(36)
  })

})