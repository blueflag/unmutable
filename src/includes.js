// @flow
import prep from './internal/prep';
import equals from './equals';
import some from './some';

export default prep({
    name: 'includes',
    immutable: 'includes',
    all: (comparisonValue: *) => some(equals(comparisonValue))
});
