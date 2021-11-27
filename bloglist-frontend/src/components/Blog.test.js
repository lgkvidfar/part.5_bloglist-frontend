import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


// i prefer the style as it looks now, same effort i promise
test('renders title and likes but not author and url', () => {
  const blog = {
    title: 'test title',
    Author: 'test author',
    url: 'test url'
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'test title'
  )

  expect(div).toHaveTextContent(
    'likes'
  )

  expect(div).not.toHaveTextContent(
    'test url'
  )

  expect(div).not.toHaveTextContent(
    'test author'
  )

})