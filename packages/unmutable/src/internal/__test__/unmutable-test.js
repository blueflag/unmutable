// @flow
import prep from '../unmutable';
import {List, Map, Record} from 'immutable';
import UnmutableCompatible from './UnmutableCompatible-testutil';
import pick from '../../pick';
let MyRecord = Record({c:"c"});

test(`unmutable prep should handle records`, () => {
    let immutable = "recordTest";
    let record = (a,b) => (item) => `${a}${b}${item.c}-record`;
    let all = (a,b) => (item) => `${a}${b}${item.c}-all`;

    let useRecordMethod = prep({name: "recordTest", record: "get"});
    let useRecord = prep({name: "recordTest", immutable, record, all});
    //let useImmutable = prep({immutable, all});
    let useNone = prep({name: "recordTest", immutable});

    expect("c").toBe(useRecordMethod("c")(new MyRecord()));
    expect("abc-record").toBe(useRecord("a","b")(new MyRecord()));
    //t.is("abc-all", useImmutable("a","b")(new MyRecord()));
    expect(() => useNone("a","b")(new MyRecord())).toThrowError(`recordTest() cannot be called with a value of Record { c: "c" }`);
});

test(`unmutable prep should handle Lists`, () => {
    let myList = List([1,2,3]);
    let all = (key) => (item) => `${key}-${item.get(0)}`;

    let useImmutable = prep({name: "get", immutable: "get", all});
    let useAll = prep({name: "get", all});
    let useMissing = prep({name: "noooooo", immutable: "noooooo"});
    let useNone = prep({name: "get"});

    expect(2).toBe(useImmutable(1)(myList));
    expect("1-1").toBe(useAll(1)(myList));
    expect(() => useMissing(1)(myList)).toThrowError(`noooooo() cannot be called with a value of List [ 1, 2, 3 ]`);
    expect(() => useNone(1)(myList)).toThrowError(`get() cannot be called with a value of List [ 1, 2, 3 ]`);
});

test(`unmutable prep should handle Maps`, () => {
    let myMap = Map({a:1,b:2,c:3});
    let all = (key) => (item) => `${key}-${item.get('a')}`;

    let useImmutable = prep({name: "get", immutable: "get", all});
    let useAll = prep({name: "get", all});
    let useNone = prep({name: "noooooo", immutable: "noooooo"});

    expect(1).toBe(useImmutable('a')(myMap));
    expect("a-1").toBe(useAll('a')(myMap));
    expect(() => useNone('a')(myMap)).toThrowError(`noooooo() cannot be called with a value of Map { "a": 1, "b": 2, "c": 3 }`);
});

test(`unmutable prep should handle arrays`, () => {
    let myArray = [1,2,3];
    let array = (key) => (item) => `${key}-${item[0]}-array`;
    let all = (key) => (item) => `${key}-${item[0]}-all`;

    let useArray = prep({name: "get", immutable: "get", array, all});
    let useAll = prep({name: "get", immutable: "get", all});
    let useNone = prep({name: "noooooo", immutable: "noooooo"});

    expect("1-1-array").toBe(useArray(1)(myArray));
    expect("1-1-all").toBe(useAll(1)(myArray));
    expect(() => useNone(1)(myArray)).toThrowError(`noooooo() cannot be called with a value of 1,2,3`);
});

test(`unmutable prep should handle Objects`, () => {
    let myObject = {a:1,b:2,c:3};
    let object = (key) => (item) => `${key}-${item.a}-object`;
    let all = (key) => (item) => `${key}-${item.a}-all`;

    let useObject = prep({name: "get", immutable: "get", object, all});
    let useKeyed = prep({name: "get", immutable: "get", all});
    let useAll = prep({name: "get", immutable: "get", all});
    let useNone = prep({name: "noooooo", immutable: "noooooo"});

    expect("a-1-object").toBe(useObject('a')(myObject));
    expect("a-1-all").toBe(useAll('a')(myObject));
    expect(() => useNone('a')(myObject)).toThrowError(`noooooo() cannot be called with a value of [object Object]`);
});

test(`unmutable prep should handle class instances`, () => {
    class A {
        a = 1;
        b = 2;
        c = 3;
    }
    let myClassInstance = new A();
    let object = (key) => (item) => `${key}-${item.a}-object`;
    let all = (key) => (item) => `${key}-${item.a}-all`;

    let useObject = prep({name: "get", immutable: "get", object, all});
    let useKeyed = prep({name: "get", immutable: "get", all});
    let useAll = prep({name: "get", immutable: "get", all});
    let useNone = prep({name: "noooooo", immutable: "noooooo"});

    expect("a-1-object").toBe(useObject('a')(myClassInstance));
    expect("a-1-all").toBe(useAll('a')(myClassInstance));
    expect(() => useNone('a')(myClassInstance)).toThrowError(`noooooo() cannot be called with a value of [object Object]`);
});

test(`unmutable prep should handle functions`, () => {
    let myFunction = () => {};
    myFunction.a = 1;
    myFunction.b = 2;
    myFunction.c = 3;

    let object = (key) => (item) => `${key}-${item.a}-object`;
    let all = (key) => (item) => `${key}-${item.a}-all`;

    let useObject = prep({name: "get", immutable: "get", object, all});
    let useKeyed = prep({name: "get", immutable: "get", all});
    let useAll = prep({name: "get", immutable: "get", all});
    let useNone = prep({name: "noooooo", immutable: "noooooo"});

    expect("a-1-object").toBe(useObject('a')(myFunction));
    expect("a-1-all").toBe(useAll('a')(myFunction));
    expect(() => useNone('a')(myFunction)).toThrowError(`noooooo() cannot be called with a value of function myFunction() {}`);
});

test(`unmutable prep should handle unmutable compatible data types`, () => {
    let myUnmutableCompatible = new UnmutableCompatible({a:1, b:2, c:3});
    let all = (key) => (item) => `all`;

    let useUnmutable = prep({name: "get", all});
    let useAll = prep({name: "getThatDoesntExistOnUmutableCompatibleThing", all});
    let useNone = prep({name: "noooooo"});

    expect(useUnmutable('a')(myUnmutableCompatible)).toBe(1); // use unmutable compatible method
    expect(useAll('a')(myUnmutableCompatible)).toBe("all"); // fallback to all if unmutable compatible method doesnt exist
    expect(() => useNone('a')(myUnmutableCompatible)).toThrowError(`noooooo() cannot be called with a value of [object Object]`); // error if method doesnt exist and all doesnt exist
});

test(`unmutable prep should not handle strings as values`, () => {
    let useNone = prep({name: "find", array: () => {}});
    expect(() => useNone()("IMNOTACOLLECTION")).toThrowError(`find() cannot be called with a value of IMNOTACOLLECTION`);
});

test(`unmutable prep should throw bad value errors from the top export of the function being called, not from an internal one`, () => {
    expect(() => {
        pick(['a'])(undefined); // deliberately pass undefined into pick's value, so something deep inside pick will break
    }).toThrowError(`Unmutable pick() cannot be called with a value of undefined`);
});

test(`unmutable prep should throw other errors from the top export of the function being called, not from an internal one`, () => {
    let errorToThrow;
    try {
        let keys = undefined;
        // $FlowFixMe - deliberate misuse of types
        keys.includes(0);
    } catch(e) {
        errorToThrow = e.message;
    }

    expect(() => {
        pick(undefined)([0,1,2]); // deliberately pass undefined into pick key array, so something deep inside pick will break
    }).toThrowError(errorToThrow);
});

