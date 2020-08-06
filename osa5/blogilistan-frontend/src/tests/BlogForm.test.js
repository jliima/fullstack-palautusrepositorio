import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'

test('<BlogForm uses correct information when calling back', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm addBlog={mockHandler} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')


  fireEvent.change(titleInput, { target: { value: 'TestTitle' } })
  fireEvent.change(authorInput, { target: { value: 'TestAuthor' } })
  fireEvent.change(urlInput, { target: { value: 'www.test.fi' } })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls.length).toBe(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('TestTitle')
  expect(mockHandler.mock.calls[0][0].author).toBe('TestAuthor')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.test.fi')

})