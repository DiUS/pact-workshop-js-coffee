# Coffee Shop Demo App(s)

## Intro

To-do list apps are contrived, and usually too basic. We need something with a small amount of complexity, in a domain that most people are familiar with. Something simple enough that you don't have to work hard to model it, but isn't trivial enough to obviate unit tests.

That said, there are still probably heaps of assumptions to be made, incorrectly or otherwise.

### Use cases

A person (customer) wants a coffee. They might come into the shop and be served by a cashier. The cashier may (or may not) be a barista.

Maybe the shop is technologically-positioned, and has a self-serve ordering kiosk. Maybe they have a mobile app for pre-ordering. Maybe these solutions also include payment.

Have you seen a baristas' management system? There are some that list each barista, each order, how long they're taking to make them, etc. Fancy stuff. It's another bounded context.

## Problem space

Actors

- Customer
- Cashier
- Barista
- Owner/manager/accountant/admin

Flows / bounded contexts

- Ordering
- Paying
- Fulfilling
- Administrationing (so many bad words)

### Solution space

Resources/entities

- Everyone in the actors list
- Loyalty model for customer
- Order (everything that's being purchased)
- Item (just coffee for now, but include types, e.g. cappuccino, café latte)
- Extra (options for coffee, such as milks, sweeteners, strong, etc)
- Payment (transaction, including receipt for tax - the only actual "requirement")

## ReSTful API

Again, do your own analysis first.

Taking the bounded context of ordering (only) . . .

```
/order          [GET, POST]
  /{id}         [GET, PATCH, DELETE]
    /coffee     [GET, POST]
      /{id}     [GET, PATCH, DELETE]
        /extra  [GET, POST]
          /{id} [GET, PUT, DELETE]
```

Probably need a list of valid values for each kind of component, and their prices . . . this should be populated from the admin context, though, not the ordering context.

```
/menu      [GET]
  /coffee  [GET]
    /extra [GET]
```

Now this has a slightly wonky abstraction, because tea, coffee, hot chocolate, etc, mostly have the same kinds of extras. I guess don't worry about it for now, but think about how you might design a more extensible API some time.
