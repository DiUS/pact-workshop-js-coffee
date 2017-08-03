import { expect } from 'chai'
import pact from 'pact'
const { eachLike, somethingLike: like } = pact.Matchers

export default ({ provider, client, headers }) =>
  describe('Order', () => {
    beforeEach(() => provider.removeInteractions())
    afterEach(() => provider.verify())

    describe('lists no orders', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to list orders',
          withRequest: {
            method: 'GET',
            path: '/order',
            headers: headers.request
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              orders: []
            }
          }
        })
      )

      // when:
      it('', () => client.listOrders()
      // then:
        .then((body) => {
          expect(body.orders).to.eql([])
        })
        .catch(fail)
      )
    })

    describe('lists many orders', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'many orders',
          uponReceiving: 'request to list many orders',
          withRequest: {
            method: 'GET',
            path: '/order',
            headers: headers.request
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              orders: eachLike({
                id: like(29),
                path: like('/order/29'),
                name: like('Jeff'),
                coffeeSummaries: eachLike(like('Large Magic'), { min: 2 })
              }, {
                min: 3, max: 7
              })
            }
          }
        })
      )

      // when:
      it('', () => client.listOrders()
      // then:
        .then((body) => {
          expect(body.orders.length).to.eql(3)

          body.orders.forEach((it) => {
            expect(it.path).to.eql(`/order/${it.id}`)
            expect(it.name).to.eql('Jeff')
            expect(it.coffeeSummaries.length).to.eql(2)
            expect(it.coffeeSummaries).to.contain('Large Magic')
          })
        })
        .catch(fail)
      )
    })

    describe('gets one order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 23',
          uponReceiving: 'request to get a specific order',
          withRequest: {
            method: 'GET',
            path: '/order/23',
            headers: headers.request
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              id: 23,
              coffees: eachLike({
                id: like(66),
                summary: like('Flat White'),
                path: like('/order/23/coffee/66')
              }, {
                min: 2
              }),
              name: like('Jimothy'),
              path: '/order/23'
            }
          }
        })
      )

      // when:
      it('', () => client.getOrder(23)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 23,
            name: 'Jimothy',
            coffees: [
              { id: 66, summary: 'Flat White', path: '/order/23/coffee/66' },
              { id: 66, summary: 'Flat White', path: '/order/23/coffee/66' }
            ],
            path: '/order/23'
          })
        })
        .catch(fail)
      )
    })

    describe('fails to get one order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to get a specific order',
          withRequest: {
            method: 'GET',
            path: '/order/999',
            headers: headers.request
          },
          willRespondWith: {
            status: 404,
            headers: headers.response,
            body: {
              message: 'Order with id 999 not found',
              path: '/order/999'
            }
          }
        })
      )

      // when:
      it('', () => client.getOrder(999)
      // then:
        .then(fail)
        .catch(({ message }) => {
          expect(message).to.eql('Order with id 999 not found')
        })
      )
    })

    describe('adds an order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to add an order',
          withRequest: {
            method: 'POST',
            path: '/order',
            headers: headers.request
          },
          willRespondWith: {
            status: 201,
            headers: headers.response,
            body: {
              id: like(11),
              path: like('/order/11')
            }
          }
        })
      )

      // when:
      it('', () => client.addOrder()
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 11,
            path: '/order/11'
          })
        })
        .catch(fail)
      )
    })

    describe('names an order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'empty order 19',
          uponReceiving: 'request to change order name',
          withRequest: {
            method: 'PATCH',
            path: '/order/19',
            headers: headers.request,
            body: {
              name: 'Jimbo'
            }
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              id: 19,
              path: '/order/19'
            }
          }
        })
      )

      // when:
      it('', () => client.nameOrder(19, 'Jimbo')
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 19,
            path: '/order/19'
          })
        })
        .catch(fail)
      )
    })

    describe('fails to name an order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to change order name',
          withRequest: {
            method: 'PATCH',
            path: '/order/777',
            headers: headers.request,
            body: {
              name: 'No Face'
            }
          },
          willRespondWith: {
            status: 404,
            headers: headers.response,
            body: {
              message: 'Order with id 777 not found',
              path: '/order/777'
            }
          }
        })
      )

      // when:
      it('', () => client.nameOrder(777, 'No Face')
      // then:
        .then(fail)
        .catch(({ message }) => {
          expect(message).to.eql('Order with id 777 not found')
        })
      )
    })

    describe('cancels an order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'empty order 19',
          uponReceiving: 'request to cancel the order',
          withRequest: {
            method: 'DELETE',
            path: '/order/19',
            headers: headers.request
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              id: 19,
              path: '/order/19'
            }
          }
        })
      )

      // when:
      it('', () => client.cancelOrder(19)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 19,
            path: '/order/19'
          })
        })
        .catch(fail)
      )
    })
  })
