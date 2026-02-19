export function filterBy<T>(array: T[], predicate: (item: T) => boolean): T[] {
  // TODO: Implementáld!
  // 1. Hozz létre üres result array-t
  const resultArray: T[] = []
  for (const item of array) {
    if (predicate(item)) {
      resultArray.push(item)
    }
  }
  return resultArray
}

const users = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 17 }
]

const adults = filterBy(users, (user) => user.age >= 18)
// adults = [{ id: 1, name: 'Alice', age: 30 }]

export function mapBy<T, U>(array: T[], transform: (item: T) => U): U[] {
  // TODO: Implementáld!
  const resultArray: U[] = array.map((item) => transform(item))
  return resultArray
}

const names = mapBy(users, (user) => user.name)
// names = ['Alice', 'Bob'] (string[])

export function findBy<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
  // TODO: Implementáld!
  const res: T | undefined = array.find((el) => predicate(el))
  return res || undefined

}

const alice = findBy(users, (user) => user.name === 'Alice')
// alice = { id: 1, name: 'Alice', age: 30 }
