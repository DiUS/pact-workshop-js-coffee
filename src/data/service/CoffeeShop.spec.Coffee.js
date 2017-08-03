import { expect } from 'chai'
import pact from 'pact'
const { somethingLike: like } = pact.Matchers

export default ({ provider, client, headers }) =>
  describe('Coffee', () => {
    beforeEach(() => provider.removeInteractions())
    afterEach(() => provider.verify())

    describe('gets a coffee', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 43 with coffee 59',
          uponReceiving: 'request to fetch a coffee',
          withRequest: {
            method: 'GET',
            path: '/order/43/coffee/59',
            headers: headers.request
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              id: 59,
              style: like('Magic'),
              size: like('Regular'),
              path: '/order/43/coffee/59'
            }
          }
        })
      )

      // when:
      it('', () => client.getCoffee(43, 59)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 59,
            style: 'Magic',
            size: 'Regular',
            path: '/order/43/coffee/59'
          })
        })
        .catch(fail)
      )
    })

    describe('adds a coffee', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'empty order 19',
          uponReceiving: 'request to add a coffee',
          withRequest: {
            method: 'POST',
            path: '/order/19/coffee',
            headers: headers.request,
            body: {
              style: 'Latte'
            }
          },
          willRespondWith: {
            status: 201,
            headers: headers.response,
            body: {
              id: like(37),
              path: like('/order/19/coffee/37')
            }
          }
        })
      )

      // when:
      it('', () => client.addCoffee(19)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 37,
            path: '/order/19/coffee/37'
          })
        })
        .catch(fail)
      )
    })

    describe("updates a coffee's style", () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 43 with coffee 59',
          uponReceiving: 'request to change coffee style',
          withRequest: {
            method: 'PATCH',
            path: '/order/43/coffee/59',
            headers: headers.request,
            body: {
              style: 'Latte'
            }
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              id: 59,
              path: '/order/43/coffee/59'
            }
          }
        })
      )

      // when:
      it('', () => client.updateCoffee(43, 59, { style: 'Latte' })
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 59,
            path: '/order/43/coffee/59'
          })
        })
        .catch(fail)
      )
    })

    describe("updates a coffee's size", () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 43 with coffee 59',
          uponReceiving: 'request to change coffee size',
          withRequest: {
            method: 'PATCH',
            path: '/order/43/coffee/59',
            headers: headers.request,
            body: {
              size: 'Piccolo'
            }
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              id: 59,
              path: '/order/43/coffee/59'
            }
          }
        })
      )

      // when:
      it('', () => client.updateCoffee(43, 59, { size: 'Piccolo' })
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 59,
            path: '/order/43/coffee/59'
          })
        })
        .catch(fail)
      )
    })

    describe('cancels a coffee', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 43 with coffee 59',
          uponReceiving: 'request to cancel coffee',
          withRequest: {
            method: 'DELETE',
            path: '/order/43/coffee/59',
            headers: headers.request
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              id: 59,
              path: '/order/43/coffee/59'
            }
          }
        })
      )

      // when:
      it('', () => client.cancelCoffee(43, 59)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 59,
            path: '/order/43/coffee/59'
          })
        })
        .catch(fail)
      )
    })
  })
