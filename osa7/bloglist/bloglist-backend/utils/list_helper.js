/* Helper functions. */

/* Import necessary modules. */
const _ = require("lodash")

/* Dummy-function for testing. */
const dummy = (blogs) => {
  return 1
}

/* Aggregate likes from all blogs using reduce. */
const totalLikes = (blogs) => {
  let initialValue = 0
  let sum = blogs.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.likes
  }, initialValue)
  return sum
}

/* Find most popular blog. */
const favoriteBlog = (blogs) => {

  /* Return null if array is empty. */
  if (blogs.length === 0) {
    return null
  }
  
  /* Max value and index by for-loop. */
  let index = 0
  let maxValue = 0
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxValue) {
      maxValue = blogs[i].likes
      index = i
    }
  }

  /* Return json-object (?). */
  return { 
    "title": blogs[index].title,
    "author": blogs[index].author,
    "likes": blogs[index].likes 
  }
}

/* Find author with most blogs. */
const mostBlogs = (blogs) => {

  /* Return null if array is empty. */
  if (blogs.length === 0) {
    return null
  }
  
  /* Use lodash to group, order and reverse array
  to find the correct author. */
  const grouped = _.groupBy(blogs, "author")
  const ordered = _.orderBy(grouped, _.size)
  const reversed = _.reverse(ordered)

  const correctAuthor = {
    author: reversed[0][0].author,
    blogs: reversed[0].length
  }

  return correctAuthor
}

/* Find author with most likes. */
const mostLikes = (blogs) => {
  
  /* Return null if array is empty. */
  if (blogs.length === 0) {
    return null
  }

  /* Use lodash to group and map to get an object that
  look like { <author name>: <number of likes> }. */
  const grouped = _.groupBy(blogs, "author")
  const mapped = _.mapValues(grouped, (o) => {
    const sumLikes = _.sumBy(o, "likes")
    return sumLikes
  })

  /* Make object keys into array and sort array according to values.
  I don't really understand what happnes here but it works. */
  const array = Object.keys(mapped)
  array.sort((a, b) => mapped[b] - mapped[a])
  const author = array.slice(0,1)

  /* Return author and amount of likes. */
  return {
    author: author[0],
    likes: mapped[author]
  }

}

/* Export functions. */
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}