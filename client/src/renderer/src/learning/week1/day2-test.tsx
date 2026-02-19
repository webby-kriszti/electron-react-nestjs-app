import { User, Product } from './day1-types'
import { isUser, isProduct, validateUser, validateProduct } from './day2-guards'

export function Week1Day2Test() {
  // Valid adatok
  const validUser: User = {
    /* ... */
  }
  const validProduct: Product = {
    /* ... */
  }

  // Invalid adatok
  const invalidUser: User = {
    /* ... */
  }
  const invalidProduct: Product = {
    id: 1,
    name: '', // Üres!
    price: -10, // Negatív!
    category: 'food',
    inStock: true
  }

  // Unknown data tesztelés
  const unknownUser: unknown = { id: 1, name: 'Test' }
  const unknownProduct: unknown = {
    id: 1,
    name: 'Laptop',
    price: 1000,
    category: 'electronics',
    inStock: true
  }

  return (
    <div style={{ padding: 20, height: '100%', overflow: 'auto' }}>
      <h2>Week 1 - Day 2: Type Guards & Validation</h2>

      {/* USER TESTS */}
      <h3>✅ Valid User:</h3>
      <pre>{JSON.stringify(validUser, null, 2)}</pre>
      <p>
        Errors:{' '}
        {validateUser(validUser).length === 0 ? '✅ None' : validateUser(validUser).join(', ')}
      </p>

      <h3>❌ Invalid User:</h3>
      <pre>{JSON.stringify(invalidUser, null, 2)}</pre>
      <p style={{ color: 'red' }}>Errors: {validateUser(invalidUser).join(', ')}</p>

      {/* PRODUCT TESTS */}
      <h3>✅ Valid Product:</h3>
      <pre>{JSON.stringify(validProduct, null, 2)}</pre>
      <p>
        Errors:{' '}
        {validateProduct(validProduct).length === 0
          ? '✅ None'
          : validateProduct(validProduct).join(', ')}
      </p>

      <h3>❌ Invalid Product:</h3>
      <pre>{JSON.stringify(invalidProduct, null, 2)}</pre>
      <p style={{ color: 'red' }}>Errors: {validateProduct(invalidProduct).join(', ')}</p>

      {/* TYPE GUARD TESTS */}
      <h3>Type Guard Tests:</h3>
      <p>Unknown data is User? {isUser(unknownUser) ? '✅ Yes' : '❌ No'}</p>
      <p>Unknown data is Product? {isProduct(unknownProduct) ? '✅ Yes' : '❌ No'}</p>
    </div>
  )
}
