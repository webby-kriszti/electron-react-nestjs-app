import { User, Product, Order } from './day1-types'

export function Week1Day1Test(): JSX.Element {
  // TODO: Hozz létre 1 user példányt
  const user: User = {
    id: 1,
    name: 'John',
    email: 'sg@sg',
    age: 45,
    isActive: true
  }

  // TODO: Hozz létre 2 product példányt
  const product1: Product = {
    id: 1,
    name: 'milk',
    price: 20,
    category: 'food',
    inStock: true
  }

  const product2: Product = {
    id: 2,
    name: 'shirt',
    price: 200,
    category: 'clothing',
    inStock: false
  }

  // TODO: Hozz létre 1 order példányt (user + products)
  const order: Order = {
    id: 12,
    userId: 1,
    products: [product1, product2],
    totalPrice: 220,
    createdAt: new Date()
  }

  return (
    <div style={{ padding: 20, height: '100%', overflow: 'auto' }}>
      <h2>Week 1 - Day 1: Types Practice</h2>
      <h3>User:</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h3>Products:</h3>
      <pre>{JSON.stringify([product1, product2], null, 2)}</pre>
      <h3>Order:</h3>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  )
}
