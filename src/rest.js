// @flow
import prep from './internal/prep';
import pipeWith from './util/pipeWith';
import del from './delete';
import first from './first';
import shift from './shift';

export default prep({
    immutable: 'rest',
    object: () => (item) => pipeWith(
        item,
        del(pipeWith(
            Object.keys(item),
            first()
        ))
    ),
    array: shift
});