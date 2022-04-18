/* Tests for utils/listHelper.favoriteBlog. */

/* Import necessary modules. */
const { test, expect } = require("@jest/globals")
const listHelper = require("../utils/list_helper")
const testArray = require("./arrays_for_testing")

/* Create unit-test for favoriteBlog. */
describe("favorite blog", () => {

  /* Empty array for testing. */
  const emptyArray = testArray.emptyArray

  /* Array with single object. */
  const arrayWithSingleObject = testArray.arrayWithSingleObject
  
  /* Array with several objects. */
  const arrayWithSeveralObjects = testArray.arrayWithSeveralObjects
  
  /* Test no.1. */
  test("of empty array is null", () => {
    const result = listHelper.favoriteBlog(emptyArray)
    expect(result).toBeNull
  })

  /* Test no.2. */
  test("of array with one blog is that blog", () => {
    const result = listHelper.favoriteBlog(arrayWithSingleObject)
    expect(result).toEqual({
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 2,
    })
  })

  /* Test no.3. */
  test("of array with several blogs", () => {
    const result = listHelper.favoriteBlog(arrayWithSeveralObjects)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })

})