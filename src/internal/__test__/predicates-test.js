// @flow
import {
    isImmutable,
    isCollection,
    isKeyed,
    isIndexed,
    isAssociative,
    isOrdered,
    isRecord,
    isValueObject
} from '../predicates';

import testTypes from '../../internal/testTypes';

testTypes({
    name: "isImmutable() predicate should work",
    fn: isImmutable,
    expectedResult: {
        undefined: false,
        null: false,
        string: false,
        number: false,
        object: false,
        array: false,
        map: true,
        orderedMap: true,
        list: true,
        record: true,
        set: true,
        orderedSet: true,
        seq: true,
        stack: true
    }
});

testTypes({
    name: "isCollection() predicate should work",
    fn: isCollection,
    expectedResult: {
        undefined: false,
        null: false,
        string: false,
        number: false,
        object: false,
        array: false,
        map: true,
        orderedMap: true,
        list: true,
        record: false,
        set: true,
        orderedSet: true,
        seq: true,
        stack: true
    }
});

testTypes({
    name: "isKeyed() predicate should work",
    fn: isKeyed,
    expectedResult: {
        undefined: false,
        null: false,
        string: false,
        number: false,
        object: false,
        array: false,
        map: true,
        orderedMap: true,
        list: false,
        record: false,
        set: false,
        orderedSet: false,
        seq: false,
        stack: false
    }
});

testTypes({
    name: "isIndexed() predicate should work",
    fn: isIndexed,
    expectedResult: {
        undefined: false,
        null: false,
        string: false,
        number: false,
        object: false,
        array: false,
        map: false,
        orderedMap: false,
        list: true,
        record: false,
        set: false,
        orderedSet: false,
        seq: true,
        stack: true
    }
});

testTypes({
    name: "isAssociative() predicate should work",
    fn: isAssociative,
    expectedResult: {
        undefined: false,
        null: false,
        string: false,
        number: false,
        object: false,
        array: false,
        map: true,
        orderedMap: true,
        list: true,
        record: false,
        set: false,
        orderedSet: false,
        seq: true,
        stack: true
    }
});

testTypes({
    name: "isOrdered() predicate should work",
    fn: isOrdered,
    expectedResult: {
        undefined: false,
        null: false,
        string: false,
        number: false,
        object: false,
        array: false,
        map: false,
        orderedMap: true,
        list: true,
        record: false,
        set: false,
        orderedSet: true,
        seq: true,
        stack: true
    }
});

testTypes({
    name: "isRecord() predicate should work",
    fn: isRecord,
    expectedResult: {
        undefined: false,
        null: false,
        string: false,
        number: false,
        object: false,
        array: false,
        map: false,
        orderedMap: false,
        list: false,
        record: true,
        set: false,
        orderedSet: false,
        seq: false,
        stack: false
    }
});

testTypes({
    name: "isValueObject() predicate should work",
    fn: isValueObject,
    expectedResult: {
        undefined: false,
        null: false,
        string: false,
        number: false,
        object: false,
        array: false,
        map: true,
        orderedMap: true,
        list: true,
        record: true,
        set: true,
        orderedSet: true,
        seq: true,
        stack: true
    }
});
