// @flow

export default (...funcs: Array<Function>): Function => {
    if(funcs.length === 0) {
        return arg => arg;
    }
    if(funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (item) => a(b(item)));
};
