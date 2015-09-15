'use strict';

var _require = require('lodash/lang');

var isObject = _require.isObject;
var isFunction = _require.isFunction;
var isUndefined = _require.isUndefined;

var EMPTY = '';
var valueBehaviourMixin = {
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            error: undefined,
            value: undefined
        };
    },
    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            error: this.props.error,
            value: this.props.value
        };
    },
    /**
    * Gte the value from the field, it will look into the refs for the value, then into the state and then into the props.
    * If the value is null or empty string the value will be changed to undefined.
    * @return {object} - The value of the field.
    */
    getValue: function getValue() {
        var value = undefined;
        if (isObject(this.refs) && isObject(this.refs.input) && isFunction(this.refs.input.getValue)) {
            value = this.refs.input.getValue();
        } else if (this.state && this.state.value !== undefined) {
            value = this.state.value;
        } else if (this.props && this.props.value !== undefined) {
            value = this.props.value;
        }
        if (isUndefined(value) || EMPTY === value) {
            value = null;
        }
        return value;
    },
    /**
    * Handler called when the input Change its value.
    * @param {event} event - The event to set.
    */
    onInputChange: function onInputChange(event) {
        if (this.props.onChange) {
            return this.props.onChange(event);
        }
        this.setState({ error: undefined, value: this.getValue() });
    }
};
module.exports = valueBehaviourMixin;