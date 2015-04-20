Programming Exercise: Shopping Cart
---
The goal of this programming exercise is to implement the server-side
functionality related to working with a shopping cart. All data
is read from file and accessed via in-memory collections.
For simplicity, there is no relational or document database.
The following services have stub methods that need to be implemented:
- `src/services/coupons.js`
- `src/services/products.js`
- `src/services/shopping-cart.js`

All of the tests for a basic shopping cart have already been
written following the pattern of Test Driven Development (TDD).
Please review the tests in `test/test.js` to get a better understanding
of the expected functionality.

## Setup
1. Install NodeJS
2. Install Dependencies
```bash
npm install
```

## Run Tests
```bash
npm test
```

## Run Server
```bash
npm start
```

## Goals
- Fork this repo
- Implement all functions that are marked with `// TODO: Implement`
  Review existing comments and tests
- Make changes until all tests pass

### Bonus Points
- Create stub routes that the REST API for the shopping cart CRUD operations.
  Assume that each shopping cart is associated with a unique session ID.
  You should add the routes to `server.js` which already has the code
  in place to launch a simple `express` server. You can also choose to use
  a different server/router as well. For clarity, you may wish to provide
  a sample response for each REST API route.

### Additional Notes
- Even though a real database is not being used, most of the CRUD functions
  for products, coupons, and shopping carts are written
  such that they can be asynchronous. To minimize dependencies,
  the Node.js-style callback convention was chosen instead of promises.
