import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component

  const user = { token: 'token1234', username: 'testerTom123', name: 'Tester Tom' }

  const blog = {
    title: 'A Test Blog',
    author: 'Testing Tero',
    url: 'www.test.site.com',
    likes: 8,
    user: {
      username: 'testerTom123',
      name: 'Tester Tom'
    }
  }

  test('renders blog title and author, but not url and likes when view is not pressed', () => {
    component = render(
      <Blog user={user} blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'A Test Blog Testing Tero'
    )
    expect(component.container).not.toHaveTextContent(
      'www.test.site.com likes 8'
    )
  })

  test('when view-button is pressed, all of the information is shown', () => {
    component = render(
      <Blog user={user} blog={blog} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'A Test Blog Testing Tero', 'likes 8', 'www.test.site.com', 'Tester Tom'
    )
  })

  test('if like-button is pressed twice, eventhandler is called twice', () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog user={user} blog={blog} modifyBlog={mockHandler} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)


    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)

  })

})

