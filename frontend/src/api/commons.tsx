// Special function use to allow JSON stringify able to handle ES6 map
const replacer = (key: string, value: any) => {
    if (value instanceof Map) {
        return Object.fromEntries(value);
    } 
    else {
        return value;
    }
}
// Rotate element in an array
const rotate = (a: Array<any>) : any => {
    a.push(a.shift());
    return a;
}

const commons = {
    map_replacer: replacer,
    rotate: rotate,
}

export default commons;