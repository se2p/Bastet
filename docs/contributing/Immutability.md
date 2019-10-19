# Immutability

The Bastet Framework relies on the immutability of objects.
We use the library [immutable-js](https://github.com/immutable-js/immutable-js)
for implementing immutable objects.

## Immutable Data Structure

immutable-js provides immutable data structures such as `List`,
`Stack`, `Map`, `OrderedMap`, `Set`, `OrderedSet`, and `Record`.
The library takes care of an efficient implementation and 
representation of these data structures.

## Key Facts

- Immutable collections should (and can) be treated as values 
  rather than objects.
- The methods `Immutable.is()` or `.equals()` must be used to 
  determine the value equality of immutable collections.

