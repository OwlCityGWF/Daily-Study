/**
 *集合是由一组无序且唯一的项组成。
 **/
 function Set() {
	var items = {};
	
	this.has = function (value) {
		// return items.hasOwnProperty(value);
		return value in items;
	};
	
	this.add = function (value) {
		if (!this.has(value)) {
			items[value] = value;
			return value;
		}
		return false;
	};
	
	this.remove = function (value) {
		if (this.has(value)) {
			delete items[value];
			return true;
		}
	};
	
	this.clear = function () {
		items = {};
	};
	
	this.seize = function () {
		return Object.keys(items).length;
	};
	
	this.values = function () {
		return Object.keys(items);
	};
	
	this.union = function (otherSet) {
		var unionSet = new Set();
		
		var values = this.values();
		for (var i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}
		
		values = otherSet.valueOf();
		for (var i = 0; i < values.length; i++) {
			unionSet.add(values[i])
		}
		
		return unionSet;
	};
	
	this.intersection = function (otherSet) {
		var intersectionSet = new Set();
		
		var values = this.values();
		for (var i = 0; i < values.length; i++) {
			if (otherSet.has(values[i])) {
				intersectionSet.add(values[i]);
			}
		}
		return intersectionSet;
	};
	
	this.difference = function (otherSet) {
		var differenceSet = new Set();
		
		var values = this.values();
		for (var i = 0; i < values.length; i++) {
			if (!otherSet.has(values[i])) {
				differenceSet.add(values[i]);
			}
		}
		return differenceSet;
	};
}

var set = new Set();
 set.add(1);
 set.add(2);
