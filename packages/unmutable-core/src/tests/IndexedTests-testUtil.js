// @flow
import {fromJS, List} from 'immutable';
import CollectionTestDefinitions from './CollectionTestDefinitions-testUtil';

export default function(test: Function, Wrap: Function, indexedTests: Array<Object>, libraryName: string) {

    var sampleArray: Array<*> = [
        70,
        2,
        [0, 1]
    ];

    var sampleArray2: Array<*> = [
        4,
        5
    ];

    //
    // List tests
    //

    test('Wrapped Lists have a size', (tt: *) => {
        var list: List<*> = fromJS(sampleArray);
        tt.is(Wrap(list).size, list.size, 'size returns correct size');
    });

    CollectionTestDefinitions({
        existingValue: 2,
        item: fromJS(sampleArray),
        itemAlternative: fromJS(sampleArray2),
        itemAtKey: sampleArray[1],
        // $FlowFixMe: Flow doesnt know that this is safe
        itemAtKeyPath: sampleArray[2][1],
        key: 1,
        keyPath: [2,1],
        libraryName,
        negativeKey: -3,
        nonExistingKey: 3,
        nonExistingKeyPath: [5,2],
        nonExistingNegativeKey: -4,
        nonExistingValue: 555,
        only: indexedTests,
        partiallyExistingKeyPath: [2,5],
        sampleValue: 789
    })
        .forEach((testConfig: Object) => {
            var {
                args,
                callbackTests = 0,
                desc,
                item,
                method,
                returnType
            } = testConfig;

            test(`"List.${method}" should ${desc}. Args: ${JSON.stringify(args())}`, (tt: *) => {
                tt.plan(1 + callbackTests);

                var immutableResult = item[method](...args());
                var unmutableMethod = Wrap(item)[method];
                if(!unmutableMethod) {
                    throw new Error(`${Wrap(item).wrapperType()}.${method}" does not exist`);
                }

                var unmutableResult = unmutableMethod(...args(tt));
                if(returnType !== "plain") {
                    unmutableResult = unmutableResult.value;
                }

                tt.deepEqual(immutableResult, unmutableResult);
            });
        });

    //
    // Array tests
    //

    test('Arrays have a size', (tt: *) => {
        tt.is(Wrap(sampleArray).size, List(sampleArray).size, 'size returns correct size');
    });

    CollectionTestDefinitions({
        existingValue: 2,
        item: sampleArray,
        itemAlternative: sampleArray2,
        itemAtKey: sampleArray[1],
        // $FlowFixMe: Flow doesnt know that this is safe
        itemAtKeyPath: sampleArray[2][1],
        key: 1,
        keyPath: [2,1],
        libraryName,
        negativeKey: -3,
        nonExistingKey: 3,
        nonExistingKeyPath: [5,2],
        nonExistingNegativeKey: -4,
        nonExistingValue: 555,
        only: indexedTests,
        partiallyExistingKeyPath: [2,5],
        sampleValue: 789
    })
        .forEach((testConfig: Object) => {
            var {
                args,
                callbackTests = 0,
                deep = false, // true if we're testing a deep method
                desc,
                item,
                method,
                returnType,
                shouldBeImmutable = true,
                shouldReturnSelf = false
            } = testConfig;

            // "self" if the thing being returned is a modified version of the original thing
                // "wrapped" if the thing being returned is to be in an unmutable-lite wrapper
                // "plain" if the thing being returned is just the value (for 'status' methods like .has())

            test(`"Array.${method}" should ${desc}. Args: ${JSON.stringify(args())}`, (tt: *) => {

                let testForImmutability = !shouldReturnSelf && returnType === "self" && shouldBeImmutable;
                tt.plan(1 + callbackTests + (testForImmutability ? 1 : 0));

                var collection = deep ? fromJS(item) : List(item);

                // $FlowFixMe: Flow doesnt know how to deal with calling computed properties
                var listResult = collection[method](...args());

                if(returnType === "self") {
                    listResult = deep ? listResult.toJS() : listResult.toArray();
                }

                var unmutableMethod = Wrap(item)[method];
                if(!unmutableMethod) {
                    throw new Error(`${Wrap(item).wrapperType()}.${method}" does not exist`);
                }

                var unmutableResult = unmutableMethod(...args(tt));

                if(returnType !== "plain") {
                    unmutableResult = unmutableResult.value;
                }

                tt.deepEqual(listResult, unmutableResult, "Result shoud be correct");
                if(testForImmutability) {
                    tt.not(item, unmutableResult, "Method should be immutable");
                }
            });
        });


}
