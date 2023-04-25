import { render } from '@testing-library/react'
import Home from '@Pages/index'

it('renders homepage unchanged', () => {
  const { container } = render(<Home pointList={[]} />)
  expect(container).toMatchSnapshot()
})
