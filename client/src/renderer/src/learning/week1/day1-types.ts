export interface User {
  id: number
  name: string
  email: string
  age: number
  isActive: boolean
}

export interface Product {
  id: number
  name: string
  price: number
  category: 'electronics' | 'clothing' | 'food'
  inStock: boolean
}

export interface Order {
  id: number
  userId: number
  products: Product[]
  totalPrice: number
  createdAt: Date
}
