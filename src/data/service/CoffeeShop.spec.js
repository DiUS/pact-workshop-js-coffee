import { expect } from 'chai'
import pact from 'pact'

import CoffeeShop from './CoffeeShop'

import Order from './CoffeeShop.spec.Order'
import Coffee from './CoffeeShop.spec.Coffee'
import Menu from './CoffeeShop.spec.Menu'
const testSuites = [Order, Menu, Coffee]

const mockServerStartupTimeout = 15000 // Slow in docker.
const port = 1234

const mimeAppJson = 'application/json'
const headers = {
  request: { 'Accept': mimeAppJson },
  response: { 'Content-Type': mimeAppJson }
}

describe('CoffeeShop service', () => {
  const client = CoffeeShop(`http://localhost:${port}`)

  let provider = pact({
    consumer: 'Coffee Web Consumer',
    provider: 'Coffee Ordering Provider',
    port: port,
    done: (error) => {
      expect(error).to.be.null
    }
  })

  beforeAll(() => provider.setup(), mockServerStartupTimeout)
  afterAll(() => provider.finalize())

  const testParams = { provider, client, headers }
  testSuites.forEach((it) => { it(testParams) })
})
