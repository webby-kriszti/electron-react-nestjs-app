import { User } from './day1-types'

export function updateUser(users: User[], id: number, updates: Partial<User>): User[] {
  return users.map((user) => (user.id === id ? { ...user, ...updates } : user))
}

export type UserSummary = Pick<User, 'id' | 'name'>

export function toUserSummary(user: User): UserSummary {
  return { id: user.id, name: user.name }
}

export type CreateUserInput = Omit<User, 'id'>

export function createUser(users: User[], input: CreateUserInput): User[] {
  const newUserId = users.length === 0 ? 1 : Math.max(...users.map((u) => u.id)) + 1
  const newUser = {
    id: newUserId,
    name: input.name,
    email: input.email,
    age: input.age,
    isActive: input.isActive
  }
  return { ...users, ...newUser }
}
export function arrayToMap(users: User[]): Record<number, User> {
  const result = {}  // ← Plain object!
  
  for (const user of users) {
    result[user.id] = user
  }
  
  return result
}
