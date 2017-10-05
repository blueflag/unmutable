// @flow
import UnmutableWrapper from './UnmutableWrapper';
import Wrap from './Wrap';
import {AddMethods, CompositeMethods} from 'unmutable-core';
const {update} = CompositeMethods;

export default class UnmutableObjectWrapper extends UnmutableWrapper {
    constructor(item: Object) {
        super(item);

        // define shallow methods
        let _this = (this: any);
        _this.clear = (): Object => ({});
        _this.concat = (newItem: Object): Object => ({...item, ...newItem});
        _this.count = (): number => _this.size;
        _this.delete = (key: *): Object => {
            let clone = {...item};
            delete clone[key];
            return clone;
        };
        _this.get = (key: *, notFoundValue: * = undefined): * => _this.has(key) ? item[key] : notFoundValue;
        _this.has = (key: *): boolean => item.hasOwnProperty(key);
        _this.includes = (value: *): boolean => {
            for(let key in item) {
                if(item[key] === value) {
                    return true;
                }
            }
            return false;
        };
        _this.isEmpty = (): boolean => item.size === 0;
        _this.map = (mapper: Function): Object => {
            return Object.keys(item).reduce((reduction: Object, key: string): Object => {
                reduction[key] = mapper(item[key], key, item);
                return reduction;
            }, {});
        };
        _this.reduce = (mapper: Function, initialReduction: *): * => {
            return Object.keys(item).reduce((reduction, key) => mapper(reduction, item[key], key, item), initialReduction);
        };
        _this.reduceRight = (mapper: Function, initialReduction: *): * => {
            return Object.keys(item).reverse().reduce((reduction, key) => mapper(reduction, item[key], key, item), initialReduction);
        };
        _this.set = (key: *, value: *): Object => ({...item, [key]: value});
        _this.update = update(_this, Wrap);

        // prepare methods
        AddMethods({
            self: this,
            methodsFrom: this,
            wrap: Wrap,
            additionalMethods: [
                "deleteIn",
                "hasIn",
                "getIn",
                "setIn",
                "updateIn"
            ]
        });

    }

    get size(): number {
        return Object.keys(this.__item).length;
    }

    isCollection(): boolean {
        return true;
    }

    isKeyed(): boolean {
        return true;
    }

    wrapperType(): string {
        return "UnmutableObjectWrapper";
    }
}
