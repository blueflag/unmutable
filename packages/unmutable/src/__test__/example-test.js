// @flow
import get from '../get';
import map from '../map';
import last from '../last';
import pipe from '../util/pipe';
import filter from '../filter';
import push from '../push';

import {fromJS} from 'immutable';

test(`lowly example`, () => {
    let data = [
        {name: "Bob"},
        {name: "Jenny"},
        {name: "Gordon"}
    ];

    let getlastName = pipe(
        last(),
        get('name')
    );

    expect("Gordon").toBe(getlastName(data));
});

test(`extravagant example`, () => {
    let data = [
        {nums: null},
        {nums: [1,2,3]},
        {nums: [4,5,6]},
        {nums: [7,8,9]},
        {nums: null},
        {nums: null}
    ];

    //
    // immutable.js (steadfast)
    //

    let immutablejsSteadfastAnswer = fromJS(data)
        .filter(ii => ii.get('nums'))
        .map(ii => ii
            .get('nums')
            .map(num => num * 10)
        )
        .push(fromJS([100,110,120]))
        .toJS();

    //
    // unmutable (mediocre)
    //

    let unmutableMedicoreAnswer = pipe(
        filter((ii: *): * => { // remove falsey nums
            return get('nums')(ii);
        }),
        map((ii: *): * => { // multiply all the nums by 10
            return pipe(
                get('nums'),
                map(ii => ii * 10)
            )(ii);
        }),
        push([100,110,120]) // more nums
    )(data);

    //
    // unmutable (beautiful)
    //

    let makeNumbersExquisite = pipe(
        filter(get('nums')),
        map(pipe(
            get('nums'),
            map(ii => ii * 10)
        )),
        push([100,110,120])
    );

    let unmutableBeautifulAnswer = makeNumbersExquisite(data);

    //
    // unmutable with immutable.js (delicate unite)
    //

    let unmutableDelicateAnswer = makeNumbersExquisite(fromJS(data)).toJS();

    //
    // expected output (wishful forever)

    let expectedOutput = [
        [10,20,30],
        [40,50,60],
        [70,80,90],
        [100,110,120]
    ];

    expect(expectedOutput).toEqual(immutablejsSteadfastAnswer);
    expect(expectedOutput).toEqual(unmutableMedicoreAnswer);
    expect(expectedOutput).toEqual(unmutableBeautifulAnswer);
    expect(expectedOutput).toEqual(unmutableDelicateAnswer);
});
