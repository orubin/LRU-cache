function node(key, value) {
    this.key = key;
    this.val = value;
    this.prev = null;
    this.next = null;
};

module.exports = node;