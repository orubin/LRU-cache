'use strict';

const lru = require('./lru');
const node = require('./cache_node');

function getLRU(capacity){
  const lru = require('./lru');
  return new lru(capacity);
}

test('Initialize LRU object with capacity 2', () => {
  const lru = getLRU(2);
  expect(lru['capacity']).toBe(2);
});

test('Check that length is 0', () => {
  const lru = getLRU(2);
  expect(lru['length']).toBe(0);
});

test('Try to get a key and see that nothing is returned', () => {
  const lru = getLRU(0);
  expect(lru.get('1')).toBe(-1);
});

test('Add a node and see if its being added', () => {
  const lru = getLRU(1);
  lru.setNewNode('test', 5);
  expect(lru['length']).toBe(1);
});

test('Add a node and see if its being added and get works', () => {
  const lru = getLRU(1);
  lru.setNewNode('test', 5);
  expect(lru.get('test')).toBe(5);
});

test('Add a node and see if its being added and get works for different value', () => {
  const lru = getLRU(1);
  lru.setNewNode('test', 5);
  expect(lru.get('test5')).toBe(-1);
});

test('Add two nodes and check params', () => {
  const lru = getLRU(2);
  lru.setNewNode('test', 5);
  lru.setNewNode('test2', 25);
  expect(lru['length']).toBe(2);
});

test('Add two nodes and check params', () => {
  const lru = getLRU(2);
  lru.setNewNode('test', 5);
  lru.setNewNode('test2', 25);
  expect(lru['length']).toBe(2);
});

test('Add three nodes - update the first-oldest and see that it is last - new', () => {
  const lru = getLRU(3);
  lru.setNewNode('test1', 5);
  lru.setNewNode('test2', 25);
  lru.setNewNode('test3', 45);
  lru.get('test1');
  expect(lru.tail.key).toBe('test1');
  expect(lru.head.key).toBe('test2');
});

test('Add three nodes - update the last and see that it is last - new', () => {
  const lru = getLRU(3);
  lru.setNewNode('test1', 5);
  lru.setNewNode('test2', 25);
  lru.setNewNode('test3', 45);
  lru.get('test3');
  expect(lru.tail.key).toBe('test3');
  expect(lru.head.key).toBe('test1');
});

test('Add three nodes - update the middle and see that it is last - new', () => {
  const lru = getLRU(3);
  lru.setNewNode('test1', 5);
  lru.setNewNode('test2', 25);
  lru.setNewNode('test3', 45);
  lru.get('test2');
  expect(lru.tail.key).toBe('test2');
  expect(lru.head.key).toBe('test1');
});

test('', () => {

});

test('', () => {

});

test('', () => {

});

test('', () => {

});