const isObject = (obj: {}) => {
    return obj != null && typeof obj === 'object';
}

export const areObjectSame = (obj1: {}, obj2: {}) => {
    if (!isObject(obj1) || !isObject(obj2)) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    // make sure all keys exist in each other regardless of order
    for (let i = 0; i < keys1.length; i++) {
        if (keys1.indexOf(keys2[i]) < 0 || keys2.indexOf(keys1[i]) < 0) {
            return false;
        }
    }

    for (let i = 0; i < keys1.length; i++) {
        const areObjects = isObject(obj1[keys1[i] as keyof typeof obj1]) && isObject(obj2[keys1[i] as keyof typeof obj2]);
        if ((areObjects && !areObjectSame(obj1[keys1[i] as keyof typeof obj1], obj2[keys1[i] as keyof typeof obj2])) || (!areObjects && obj1[keys1[i] as keyof typeof obj1] !== obj2[keys1[i] as keyof typeof obj2])) {
            return false;
        }
    }

    return true;
}