import { User, Product, Order } from './day1-types'

export function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false

  const obj = value as any

  return (
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.age === 'number' &&
    typeof obj.isActive === 'boolean'
  )
}
export function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false

  const obj = value as any

  return (
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    (obj.category === 'electrinics' ||
      obj.category === 'electrinics' ||
      obj.category === 'electrinics') &&
    typeof obj.inStock === 'boolean'
  )
  // TODO: Ugyanaz mint isUser, de Product-ra!
  // NE FELEJTS EL: category union type ellenőrzés!
  // category === 'electronics' || category === 'clothing' || category === 'food'
}
export function validateUser(user: User): string[] {
  const errors: string[] = []
  if (user.age <= 0) {
    errors.push('Age must be positive')
  }
  if (user.age >= 150) {
    errors.push('Age must be below 150')
  }

  if (!user.email) {
    errors.push('fff')
    return errors
  }
  const splittedEmail = user.email.split('')
  if (!splittedEmail.includes('@')) {
    errors.push('Invalid email address')
  }
  if (user.name === '') {
    errors.push('Invalid name')
  }

  return errors
}
export function validateProduct(product: Product): string[] {
  const errors: string[] = []
  /* if (!product.price || !product.name) {
    errors.push('invalid!!!')
    return errors
  } */
  if (product.price <= 0) {
    errors.push('Invalid price!')
  }
  if (!product.name || product.name.trim() === '') {
    errors.push('Invalid name!')
  }

  return errors
}
