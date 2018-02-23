// @flow
import prep from './internal/prep';

export default prep({
    immutable: "keys",
    record: () => (item: *) => item.toSeq().keys(),
    // $FlowFixMe - flow cannot recognise Symbol.iterator (apparently fixed in later version https://github.com/facebook/flow/issues/1163)
    object: () => (item: Object): Iterator<*> => {
        let counter = 0;
        const keys = Object.keys(item);
        return {
            [Symbol.iterator]: function(): Object {
                return this;
            },
            next: () => keys.hasOwnProperty(counter)
                ? ({
                    value: keys[counter++],
                    done: false
                })
                : ({
                    done: true
                })
        };
    },
    array: () => (item: Array<*>): Iterator<*> => item.keys()
});