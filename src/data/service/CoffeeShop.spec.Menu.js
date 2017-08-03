import { expect } from 'chai'
import pact from 'pact'
const { eachLike, somethingLike: like } = pact.Matchers

export default ({ provider, client, headers }) =>
  describe('Menu', () => {
    beforeEach(() => provider.removeInteractions())
    afterEach(() => provider.verify())

    describe('gets the base menu', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to fetch the menu',
          withRequest: {
            method: 'GET',
            path: '/menu',
            headers: headers.request
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              coffee: '/menu/coffee',
              path: '/menu'
            }
          }
        })
      )

      // when:
      it('', () => client.getMenu()
      // then:
        .then((body) => {
          expect(body).to.eql({
            coffee: '/menu/coffee',
            path: '/menu'
          })
        })
        .catch(fail)
      )
    })

    describe('gets the coffee menu', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to fetch the coffee menu',
          withRequest: {
            method: 'GET',
            path: '/menu/coffee',
            headers: headers.request
          },
          willRespondWith: {
            status: 200,
            headers: headers.response,
            body: {
              style: eachLike(like('Latte'), { min: 3 }),
              size: eachLike(like('Regular'), { min: 1 })
            }
          }
        })
      )

      // when:
      it('', () => client.getCoffeeMenu()
      // then:
        .then((body) => {
          expect(body).to.eql({
            style: [ 'Latte', 'Latte', 'Latte' ],
            size: [ 'Regular' ]
          })
        })
        .catch(fail)
      )
    })
  })
