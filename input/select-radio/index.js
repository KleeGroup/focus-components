'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var SelectRadio = function (_Component) {
    _inherits(SelectRadio, _Component);

    function SelectRadio() {
        var _temp, _this, _ret;

        _classCallCheck(this, SelectRadio);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            uniqueName: (0, _uniqueId2.default)('options_'),
            value: _this.props.value
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    SelectRadio.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    };

    /**
     * Get the value from the select in the DOM.
     * @return {string, number} selected value
     */


    SelectRadio.prototype.getValue = function getValue() {
        return this.state.value;
    };

    /**
    * handle click on radio
    * @param {object} event - the click event
    */


    SelectRadio.prototype._handleRadioChange = function _handleRadioChange(newValue) {
        var onChange = this.props.onChange;

        if (onChange) {
            onChange(newValue);
            return;
        }
        //Set the state then call the change handler.
        this.setState({ value: newValue });
    };

    /**
     * Closure to capture key and radio status.
     * @param  {string} key the key of radio
     * @return {func} status closure
     */


    SelectRadio.prototype._getRadioChangeHandler = function _getRadioChangeHandler(key) {
        var _this2 = this;

        return function () {
            _this2._handleRadioChange(key);
        };
    };

    /**
    * Render radio for each values
    * @return {XML} the different radio values
    */


    SelectRadio.prototype.renderSelectRadios = function renderSelectRadios() {
        var _this3 = this;

        var uniqueName = this.state.uniqueName;

        return this.props.values.map(function (val, idx) {
            var value = val[_this3.props.valueKey];
            var label = val[_this3.props.labelKey];
            var disabled = _this3.props.disabled;
            var isChecked = value === _this3.state.value;
            return _react2.default.createElement(_radio2.default, { key: idx, label: _i18next2.default.t(label), name: uniqueName, onChange: _this3._getRadioChangeHandler(value), value: isChecked, disabled: disabled });
        });
    };

    SelectRadio.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'select-radio' },
            this.renderSelectRadios()
        );
    };

    return SelectRadio;
}(_react.Component);

SelectRadio.defaultProps = {
    values: [],
    valueKey: 'code',
    labelKey: 'label',
    disabled: false
};
SelectRadio.propTypes = {
    values: _react.PropTypes.array,
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string, _react.PropTypes.array]),
    valueKey: _react.PropTypes.string,
    labelKey: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    disabled: _react.PropTypes.bool
};


SelectRadio.displayName = 'SelectRadio';

exports.default = SelectRadio;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIlNlbGVjdFJhZGlvIiwic3RhdGUiLCJ1bmlxdWVOYW1lIiwidmFsdWUiLCJwcm9wcyIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXdQcm9wcyIsInNldFN0YXRlIiwiZ2V0VmFsdWUiLCJfaGFuZGxlUmFkaW9DaGFuZ2UiLCJuZXdWYWx1ZSIsIm9uQ2hhbmdlIiwiX2dldFJhZGlvQ2hhbmdlSGFuZGxlciIsImtleSIsInJlbmRlclNlbGVjdFJhZGlvcyIsInZhbHVlcyIsIm1hcCIsInZhbCIsImlkeCIsInZhbHVlS2V5IiwibGFiZWwiLCJsYWJlbEtleSIsImRpc2FibGVkIiwiaXNDaGVja2VkIiwidCIsInJlbmRlciIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsImFycmF5Iiwib25lT2ZUeXBlIiwibnVtYmVyIiwic3RyaW5nIiwiZnVuYyIsImJvb2wiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLFc7Y0FBQUEsVzs7YUFBQUEsVzs7OzhCQUFBQSxXOzs7Ozs7Z0pBaUJGQyxLLEdBQVE7QUFDSkMsd0JBQVksd0JBQVMsVUFBVCxDQURSO0FBRUpDLG1CQUFPLE1BQUtDLEtBQUwsQ0FBV0Q7QUFGZCxTOzs7QUFqQk5ILGUsV0FzQkZLLHlCLHNDQUEwQkMsUSxFQUFVO0FBQ2hDLGFBQUtDLFFBQUwsQ0FBYyxFQUFDSixPQUFPRyxTQUFTSCxLQUFqQixFQUFkO0FBQ0gsSzs7QUFFRDs7Ozs7O0FBMUJFSCxlLFdBOEJGUSxRLHVCQUFZO0FBQ1IsZUFBTyxLQUFLUCxLQUFMLENBQVdFLEtBQWxCO0FBQ0gsSzs7QUFFRDs7Ozs7O0FBbENFSCxlLFdBc0NGUyxrQiwrQkFBbUJDLFEsRUFBVTtBQUFBLFlBQ2xCQyxRQURrQixHQUNOLEtBQUtQLEtBREMsQ0FDbEJPLFFBRGtCOztBQUV6QixZQUFHQSxRQUFILEVBQWE7QUFDVEEscUJBQVNELFFBQVQ7QUFDQTtBQUNIO0FBQ0Q7QUFDQSxhQUFLSCxRQUFMLENBQWMsRUFBQ0osT0FBT08sUUFBUixFQUFkO0FBQ0gsSzs7QUFFRDs7Ozs7OztBQWhERVYsZSxXQXFERlksc0IsbUNBQXVCQyxHLEVBQUs7QUFBQTs7QUFDeEIsZUFBTyxZQUFNO0FBQ1QsbUJBQUtKLGtCQUFMLENBQXdCSSxHQUF4QjtBQUNILFNBRkQ7QUFHSCxLOztBQUVEOzs7Ozs7QUEzREViLGUsV0ErREZjLGtCLGlDQUFxQjtBQUFBOztBQUFBLFlBQ1ZaLFVBRFUsR0FDSSxLQUFLRCxLQURULENBQ1ZDLFVBRFU7O0FBRWpCLGVBQU8sS0FBS0UsS0FBTCxDQUFXVyxNQUFYLENBQWtCQyxHQUFsQixDQUFzQixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUN2QyxnQkFBTWYsUUFBUWMsSUFBSSxPQUFLYixLQUFMLENBQVdlLFFBQWYsQ0FBZDtBQUNBLGdCQUFNQyxRQUFRSCxJQUFJLE9BQUtiLEtBQUwsQ0FBV2lCLFFBQWYsQ0FBZDtBQUNBLGdCQUFNQyxXQUFXLE9BQUtsQixLQUFMLENBQVdrQixRQUE1QjtBQUNBLGdCQUFNQyxZQUFZcEIsVUFBVSxPQUFLRixLQUFMLENBQVdFLEtBQXZDO0FBQ0EsbUJBQ0ksaURBQU8sS0FBS2UsR0FBWixFQUFpQixPQUFPLGtCQUFRTSxDQUFSLENBQVVKLEtBQVYsQ0FBeEIsRUFBMEMsTUFBTWxCLFVBQWhELEVBQTRELFVBQVUsT0FBS1Usc0JBQUwsQ0FBNEJULEtBQTVCLENBQXRFLEVBQTBHLE9BQU9vQixTQUFqSCxFQUE0SCxVQUFVRCxRQUF0SSxHQURKO0FBR0gsU0FSTSxDQUFQO0FBU0gsSzs7QUExRUN0QixlLFdBNEVGeUIsTSxxQkFBUztBQUNMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxjQUFoQjtBQUNLLGlCQUFLWCxrQkFBTDtBQURMLFNBREo7QUFLSCxLOztXQWxGQ2QsVzs7O0FBQUFBLFcsQ0FDSzBCLFksR0FBZTtBQUNsQlgsWUFBUSxFQURVO0FBRWxCSSxjQUFVLE1BRlE7QUFHbEJFLGNBQVUsT0FIUTtBQUlsQkMsY0FBVTtBQUpRLEM7QUFEcEJ0QixXLENBUUsyQixTLEdBQVk7QUFDZlosWUFBUSxpQkFBVWEsS0FESDtBQUVmekIsV0FBTyxpQkFBVTBCLFNBQVYsQ0FBb0IsQ0FBQyxpQkFBVUMsTUFBWCxFQUFtQixpQkFBVUMsTUFBN0IsRUFBcUMsaUJBQVVILEtBQS9DLENBQXBCLENBRlE7QUFHZlQsY0FBVSxpQkFBVVksTUFITDtBQUlmVixjQUFVLGlCQUFVVSxNQUpMO0FBS2ZwQixjQUFVLGlCQUFVcUIsSUFMTDtBQU1mVixjQUFVLGlCQUFVVztBQU5MLEM7OztBQTZFdkJqQyxZQUFZa0MsV0FBWixHQUEwQixhQUExQjs7a0JBRWVsQyxXIiwiZmlsZSI6ImZyLUZSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJhZGlvIGZyb20gJy4uL3JhZGlvJztcclxuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJ2xvZGFzaC91bmlxdWVJZCc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5cclxuY2xhc3MgU2VsZWN0UmFkaW8gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICB2YWx1ZXM6IFtdLFxyXG4gICAgICAgIHZhbHVlS2V5OiAnY29kZScsXHJcbiAgICAgICAgbGFiZWxLZXk6ICdsYWJlbCcsXHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5hcnJheV0pLFxyXG4gICAgICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGxhYmVsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2xcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgdW5pcXVlTmFtZTogdW5pcXVlSWQoJ29wdGlvbnNfJyksXHJcbiAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXdQcm9wcy52YWx1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3QgaW4gdGhlIERPTS5cclxuICAgICAqIEByZXR1cm4ge3N0cmluZywgbnVtYmVyfSBzZWxlY3RlZCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIGhhbmRsZSBjbGljayBvbiByYWRpb1xyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSB0aGUgY2xpY2sgZXZlbnRcclxuICAgICovXHJcbiAgICBfaGFuZGxlUmFkaW9DaGFuZ2UobmV3VmFsdWUpIHtcclxuICAgICAgICBjb25zdCB7b25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZihvbkNoYW5nZSkge1xyXG4gICAgICAgICAgICBvbkNoYW5nZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9TZXQgdGhlIHN0YXRlIHRoZW4gY2FsbCB0aGUgY2hhbmdlIGhhbmRsZXIuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5ld1ZhbHVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zdXJlIHRvIGNhcHR1cmUga2V5IGFuZCByYWRpbyBzdGF0dXMuXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGtleSB0aGUga2V5IG9mIHJhZGlvXHJcbiAgICAgKiBAcmV0dXJuIHtmdW5jfSBzdGF0dXMgY2xvc3VyZVxyXG4gICAgICovXHJcbiAgICBfZ2V0UmFkaW9DaGFuZ2VIYW5kbGVyKGtleSkge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZVJhZGlvQ2hhbmdlKGtleSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHJhZGlvIGZvciBlYWNoIHZhbHVlc1xyXG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSBkaWZmZXJlbnQgcmFkaW8gdmFsdWVzXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyU2VsZWN0UmFkaW9zKCkge1xyXG4gICAgICAgIGNvbnN0IHt1bmlxdWVOYW1lfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmFsdWVzLm1hcCgodmFsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2YWxbdGhpcy5wcm9wcy52YWx1ZUtleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdmFsW3RoaXMucHJvcHMubGFiZWxLZXldO1xyXG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMucHJvcHMuZGlzYWJsZWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9IHZhbHVlID09PSB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFJhZGlvIGtleT17aWR4fSBsYWJlbD17aTE4bmV4dC50KGxhYmVsKX0gbmFtZT17dW5pcXVlTmFtZX0gb25DaGFuZ2U9e3RoaXMuX2dldFJhZGlvQ2hhbmdlSGFuZGxlcih2YWx1ZSl9IHZhbHVlPXtpc0NoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWxlY3QtcmFkaW8nID5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNlbGVjdFJhZGlvcygpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5TZWxlY3RSYWRpby5kaXNwbGF5TmFtZSA9ICdTZWxlY3RSYWRpbyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RSYWRpbztcclxuIl19