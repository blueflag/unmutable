// @flow
import toKeyed from '../toKeyed';
import test from 'ava';
import {fromJS} from 'immutable';

test(`toKeyed() on object should make object`, (tt: *) => {
    tt.deepEqual(
        {a:1, b:2, c:3},
        toKeyed()({a:1, b:2, c:3})
    );
});

test(`toKeyed() on Map should make Map`, (tt: *) => {
    tt.deepEqual(
        fromJS({a:1, b:2, c:3}),
        toKeyed()(fromJS({a:1, b:2, c:3}))
    );
});

test(`toKeyed() on array should make object`, (tt: *) => {
    tt.deepEqual(
        {['0']:4,['1']:5,['2']:6,['3']:7},
        toKeyed()([4,5,6,7])
    );
});

test(`toKeyed() on List should make Map`, (tt: *) => {
    tt.true(
        fromJS({})
            .set(0,4)
            .set(1,5)
            .equals(toKeyed()(fromJS([4,5])))
    );
});
