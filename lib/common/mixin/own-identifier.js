'use strict';

var uuid = require('uuid');
/**
 * Export a method which add an identifier to component;
 * @type {Object}
 */
module.exports = {
    /** @inheriteDoc */
    componentWillMount: function componentWillMount() {
        Object.defineProperty(this, '_identifier', {
            value: uuid.v4(),
            writable: false,
            enumerable: true,
            configurable: false
        });
    }
};