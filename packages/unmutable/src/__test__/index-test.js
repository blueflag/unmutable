// @flow
var fs = require('fs');
import * as src from '../../index';

let files = [
    "butLast",
    "chunkBy",
    "chunk",
    "clear",
    "clone",
    "concat",
    "count",
    "deal",
    "defaults",
    "deleteAll",
    "deleteIn",
    "delete",
    "doIf",
    "entries",
    "entriesReverse",
    "entryArray",
    "equals",
    "every",
    "filter",
    "filterNot",
    "findEntry",
    "findIndex",
    "find",
    "findKey",
    "findLastEntry",
    "findLastIndex",
    "findLast",
    "findLastKey",
    "first",
    "flatMap",
    "flatten",
    "forEach",
    "getIn",
    "get",
    "groupBy",
    "hashCode",
    "hasIn",
    "has",
    "identity",
    "includes",
    "indexOf",
    "insert",
    "interpose",
    "isEmpty",
    "isNotEmpty",
    "join",
    "keyArray",
    "keyBy",
    "keyOf",
    "keys",
    "lastIndexOf",
    "last",
    "lastKeyOf",
    "log",
    "map",
    "maxBy",
    "max",
    "mergeDeepIn",
    "mergeDeep",
    "mergeDeepWith",
    "mergeIn",
    "merge",
    "mergeWith",
    "minBy",
    "min",
    "move",
    "notEquals",
    "omit",
    "pick",
    "pivot",
    "pop",
    "push",
    "reduce",
    "reduceRight",
    "rename",
    "rest",
    "reverse",
    "rotate",
    "setIn",
    "set",
    "setSize",
    "shallowEquals",
    "shallowToJS",
    "shift",
    "size",
    "skip",
    "skipLast",
    "skipUntil",
    "skipWhile",
    "slice",
    "some",
    "sortBy",
    "sort",
    "splice",
    "strictEquals",
    "swap",
    "take",
    "takeLast",
    "takeUntil",
    "takeWhile",
    "toArray",
    "toIndexed",
    "toJS",
    "toJSON",
    "toKeyed",
    "toObject",
    "uniqueBy",
    "unique",
    "unit",
    "unshift",
    "updateIn",
    "updateInto",
    "update",
    "valueArray",
    "values",
    "zipAll",
    "zip",
    "zipWith",
    "compose",
    "composeWith",
    "isAssociative",
    "isCollection",
    "isImmutable",
    "isIndexed",
    "isKeyed",
    "isObject",
    "isOrdered",
    "isPlainObject",
    "isRecord",
    "isValueObject",
    "isWriteable",
    "method",
    "overload",
    "pipeIf",
    "pipe",
    "pipeWith",
    "range"
];

files.forEach((file) => {
    test(`${file} should be included in main export`, () => {
        expect(typeof src[file]).toBe("function");
    });
});
