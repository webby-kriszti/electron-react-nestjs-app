import { User, Product } from './day1-types'
import { filterBy, mapBy, findBy } from './day3-generics'

export function Week1Day3Test() {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@test.com', age: 30, isActive: true },
    { id: 2, name: 'Bob', email: 'bob@test.com', age: 17, isActive: false },
    { id: 3, name: 'Charlie', email: 'charlie@test.com', age: 25, isActive: true }
  ]

  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000, category: 'electronics', inStock: true },
    { id: 2, name: 'Shirt', price: 50, category: 'clothing', inStock: false },
    { id: 3, name: 'Apple', price: 2, category: 'food', inStock: true }
  ]

  // TODO: Használd a generic function-öket!
  const activeUsers = filterBy(users, (user) => user.isActive)
  const inStockProducts = filterBy(products, (product) => product.inStock)

  const userNames = mapBy(users, (user) => user.name)
  const productPrices = mapBy(products, (product) => product.name)

  const foundUser = findBy(users, (user) => user.name === 'Alice')
  const foundProduct = findBy(products, (product) => product.id === 2)

  return (
    <div style={{ padding: 20, height: '100%', overflow: 'auto' }}>
      <h2>Week 1 - Day 3: Generics</h2>

      <h3>Filter - Active Users:</h3>
      <pre>{JSON.stringify(activeUsers, null, 2)}</pre>

      <h3>Filter - In Stock Products:</h3>
      <pre>{JSON.stringify(inStockProducts, null, 2)}</pre>

      <h3>Map - User Names:</h3>
      <pre>{JSON.stringify(userNames, null, 2)}</pre>

      <h3>Map - Product Prices:</h3>
      <pre>{JSON.stringify(productPrices, null, 2)}</pre>

      <h3>Find - User 'Alice':</h3>
      <pre>{JSON.stringify(foundUser, null, 2)}</pre>

      <h3>Find - Product id=2:</h3>
      <pre>{JSON.stringify(foundProduct, null, 2)}</pre>
    </div>
  )
}
