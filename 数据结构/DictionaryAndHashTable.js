/**
 *字典:[键,值]存储,映射.(Map)
 * 集合:[值，值]存储(Set)
 * @constructor
 */
function Dictionary() {
	var items = {};
	this.has = function (key) {
		return key in items;
	};
	
	this.set = function (key, value) {
		items[key] = value;
	};
	
	this.remove = function (key) {
		if (this.has(key)) {
			delete items[key];
			return true;
		}
		return false;
	};
	
	this.get = function (key) {
		return this.has(key) ? items[key] : undefined;
	};
	
	this.keys = function () {
		return Object.keys(items);
	};
	
	this.values = function () {
		var values = [];
		for (var k in items) {
			if (this.has(k)) { // 排除从Object类中继承来的属性
				values.push(items[k]);
			}
		}
		return values;
	};
	
	this.getItems = function () {
		return items;
	}
}

var dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John','john@email.com');
dictionary.set('tyrion','tyrion@email.com');
console.log(dictionary.has('Gandalf'));
console.log(dictionary.get('Gandalf'));
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());

/**
 * 散列表
 */
function HashTable() {
	var table = [];
	var loseloseHashCode = function (key) {
		var hash = 0;
		for (var i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash % 37;
	};
	
	this.put = function (key, value) {
		var position = loseloseHashCode(key);
		console.log(position + ' - ' + key);
		table[position] = value;
	};
	
	this.get = function (key) {
		return table[loseloseHashCode(key)];
	};
	
	this.remove = function (key) {
		table[loseloseHashCode(key)] = undefined;
	};
}

var hash = new HashTable();
hash.put('Gandalf','Gandalf@gmail.com');
hash.put('John','John@gmail.com');
hash.put('Tyrion','Tyrion@gmail.com');

console.log(hash.get('Gandalf'));

