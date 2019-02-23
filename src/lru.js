// double linked list implementation when head is the oldest item
var node = require('./cache_node');

// function lru(capacity) {
const lru = function(capacity) {
    this.capacity = capacity;
    this.length = 0;
    this.map = {};

    this.head = null;
    this.tail = null;
};

lru.prototype.get = function(key) {
    if(this.map != undefined && this.map.hasOwnProperty(key)){
        this.updateNode(key);
        return this.map[key].val;
    }
    else{
        
        return -1;
    }
};

lru.prototype.setNewNode = function(key, value) {
    var newNode = new node(key, value);

    // check if the item exists in the cache
    if(this.map != undefined && this.map.hasOwnProperty(key)){
        this.map[key].val = value;
        this.updateNode(key);
        return;
    }
    // the item was not in the cache - let's add it
    
    // check if the cache is full
    if(this.length >= this.capacity){
        // if so - kick the LRU item
        delete this.map[this.head.key];
        this.head.next.prev = null;
        this.head = this.head.next;
        this.length--;
    }

    // list is empty - first one
    if(this.length == 0) {
        this.head = this.tail = newNode;
    }
    else {
        // add the new item at the end
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    // add the item to the map and increase size
    this.map[key] = newNode;
    this.length ++
};

lru.prototype.updateNode = function(key) {
    var node = this.map[key];

    if(node.next == null) {
        // node is at the tail - don't do anything
        return;
    }

    if(node.prev == null){
        // current node is the oldest - move to the end to make it the newest
        this.head = node.next;
        this.head.prev = null;
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
        this.tail.next = null;
        return;
    }

    // else - node is in the middle of the chain
    var prev = node.prev;
    var next = node.next;
    prev.next = next;
    next.prev = prev;

    // put the node at the 
    this.tail.next = node;
    node.next = null;
    node.prev = this.tail;
    this.tail = node;
};

module.exports = lru;
