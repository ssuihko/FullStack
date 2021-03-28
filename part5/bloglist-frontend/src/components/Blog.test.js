import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'title',
    author: 'author',
    url: 'www.url.com',
    likes: 5,
}

test('renders title and author', () => {

    const component = render (
        <Blog blog={blog} />
    )

    const div = component.container.querySelector('.blogstyle')
    expect(div).toHaveTextContent(
        'title author'
    )
})

test('renders everything after the view button is clicked', async () => {

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
  
    expect(component.getByTestId('all')).toHaveTextContent(
        'hidetitleauthorlikes 5like'
    )

  })

  test('if the like button is pressed twice, the event handler is called twice as well', async () => {
    
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likeBlog={mockHandler} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })