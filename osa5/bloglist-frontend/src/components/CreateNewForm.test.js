/* Import necessary modules for testing. */
import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateNewForm from "./CreateNewForm"

/* Test no.1. */
test("that user input is correct on submit", async () => {
  /* Define prop testuser. */
  const testuser = {
    name: "Test User",
    id: 12345,
  }

  /* Define user. */
  const user = userEvent.setup()

  /* Define mockHandler for prop handleCreateNew. */
  const mockHandler = jest.fn()

  /* Render component. */
  render(<CreateNewForm user={testuser} handleCreateNew={mockHandler} />)

  /* Select input fields from returned array. */
  const inputFields = screen.getAllByRole("textbox")
  const title = inputFields[0]
  const author = inputFields[1]
  const url = inputFields[2]

  /* Select submit button. */
  const submitButton = screen.getByText("Create")

  /* Type into input fields. */
  await user.type(title, "Blog Title")
  await user.type(author, "Blog Author")
  await user.type(url,"www.testing.com")

  /* Click button. */
  await user.click(submitButton)

  /* Find submitted values in mockHandler object. */
  const submittedTitle = mockHandler.mock.calls[0][0].title
  const submittedAuthor = mockHandler.mock.calls[0][0].author
  const submittedUrl = mockHandler.mock.calls[0][0].url

  /* Expect mockHandler values to be submitted values. */
  expect(submittedTitle).toBe("Blog Title")
  expect(submittedAuthor).toBe("Blog Author")
  expect(submittedUrl).toBe("www.testing.com")
})