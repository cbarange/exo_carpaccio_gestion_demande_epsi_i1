/*// yarn add jest
// npx jest index.test.js
const main = require('./index')


it('Ask state code', () => {
  console.log = jest.fn()
  main()
  expect(console.log.mock.calls[0].value).toContain("Veuillez saisir le code d'état ?")
})*/