function getLength(something: string | number): number {
    if (typeof something === 'string') {
        return something.length;
    } else {
        console.log('aaaa')
        return something.toString().length;
    }
}
