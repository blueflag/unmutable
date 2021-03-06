// @flow
import isEmpty from '../isEmpty';
import compare from '../internal/__test__/compare-testutil';

compare({
    name: `isEmpty() should work on objects`,
    item: {a:1, b:2},
    fn: isEmpty(),
    record: true
});

compare({
    name: `isEmpty() should work on empty objects`,
    item: {},
    fn: isEmpty(),
    record: true
});

compare({
    name: `isEmpty() should work on arrays`,
    item: [1,2,3],
    fn: isEmpty()
});

compare({
    name: `isEmpty() should work on empty arrays`,
    item: [],
    fn: isEmpty()
});
