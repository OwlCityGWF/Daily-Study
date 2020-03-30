function getLength(something) {
    if (typeof something === 'string') {
        return something.length;
    }
    else {
        console.log('aaaa');
        return something.toString().length;
    }
}
