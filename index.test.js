// yarn add jest
// npx jest index.test.js
const main = require('./index')


it('console.log the text "hello"', () => {
  console.log = jest.fn()
  main()
  // The first argument of the first call to the function was 'hello'
  expect(console.log.mock.calls[0][0]).toBe('Hello World!')
})