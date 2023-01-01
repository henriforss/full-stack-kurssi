/* Test for utils/list_helper.mostLikes. */

/* Import necessary modules. */
const listHelper = require("../utils/list_helper")
const testArray = require("./arrays_for_testing")

/* Create unit test for Mostlikes. */
describe("most likes", () => {

  /* Imported arrays for testing. */
  const emptyArray = testArray.emptyArray
  const arrayWithSingleObject = testArray.arrayWithSingleObject
  const arrayWithSeveralObjects = testArray.arrayWithSeveralObjects
  
  /* Test no.1. */
  test("of empty array is null", () => {
    const result = listHelper.mostLikes(emptyArray)
    expect(result).toBeNull
  })

  /* Test no.2. */
  test("of array with single blog is that blogs likes", () => {
    const result = listHelper.mostLikes(arrayWithSingleObject)
    expect(result).toEqual({
      author: "Robert C. Martin",
      likes: 2
    })
  })

  /* Test no.3. */
  test("of array with several objects is one authors total likes", () => {
    const result = listHelper.mostLikes(arrayWithSeveralObjects)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

})