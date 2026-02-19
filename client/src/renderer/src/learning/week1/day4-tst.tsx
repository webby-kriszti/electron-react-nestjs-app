import { User } from './day1-types'
import {
  updateUser,
  UserSummary,
  toUserSummary,
  CreateUserInput,
  createUser,
  arrayToMap
} from './day4-utility'

export function Week1Day4Test() {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@test.com', age: 30, isActive: true },
    { id: 2, name: 'Bob', email: 'bob@test.com', age: 25, isActive: false }
  ]

  // Partial - updateUser
  const updatedUsers = updateUser(users, 1, { name: 'Alicia', age: 31 })

  // Pick - toUserSummary
  const summary: UserSummary = toUserSummary(users[0])

  // Omit - createUser
  const newUserInput: CreateUserInput = {
    name: 'Charlie',
    email: 'charlie@test.com',
    age: 28,
    isActive: true
  }
  const usersWithNew = createUser(users, newUserInput)

  // Record - arrayToMap
  const userMap = arrayToMap(users)

  return (
    <div style={{ padding: 20, height: '100%', overflow: 'auto' }}>
      <h2>Week 1 - Day 4: Utility Types</h2>

      <h3>Partial - Updated Users:</h3>
      <pre>{JSON.stringify(updatedUsers, null, 2)}</pre>

      <h3>Pick - User Summary:</h3>
      <pre>{JSON.stringify(summary, null, 2)}</pre>

      <h3>Omit - Created User:</h3>
      <pre>{JSON.stringify(usersWithNew, null, 2)}</pre>

      <h3>Record - User Map:</h3>
      <pre>{JSON.stringify(userMap, null, 2)}</pre>
    </div>
  )
}