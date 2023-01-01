/* Tests for utils/list_helper.mostBlogs. */

/* Import necessary modules. */
const { test, describe, expect } = require("@jest/globals")
const listHelper = require("../utils/list_helper")
const testArray = require("./arrays_for_testing")

/* Create unit test for mostBlogs. */
describe("most blogs", () => {

    /* Imported arrays for testing. */
    const emptyArray = testArray.emptyArray
    const arrayWithSingleObject = testArray.arrayWithSingleObject
    const arrayWithSeveralObjects = testArray.arrayWithSeveralObjects

    /* Test no.1. */
    test("of empty array is null", () => {
      const result = listHelper.mostBlogs(emptyArray)
      expect(result).toBeNull
    })

    /* Test no.2. */
    test("of array with single blog is that blog", () => {
      const result = listHelper.mostBlogs(arrayWithSingleObject)
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 1
      })
    })

    /* Test no.3. */
    test("of array with several objects", () => {
      const result = listHelper.mostBlogs(arrayWithSeveralObjects)
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
    })
    
})






