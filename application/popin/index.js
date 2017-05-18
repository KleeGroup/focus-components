'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Dependencies

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _exception = require('focus-core/exception');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Small overlay component used to listen to scroll and prevent it to leave the Popin component
*/
var Overlay = _react2.default.createClass({
    displayName: 'PopinOverlay',
    propTypes: {
        children: _react.PropTypes.object,
        clickHandler: _react.PropTypes.func,
        show: _react.PropTypes.bool
    },
    getDefaultProps: function getDefaultProps() {
        return { show: false };
    },

    /**
    * Store the body overgflow property, and set it to hidden
    * @private
    */
    _hideBodyOverflow: function _hideBodyOverflow() {
        document.body.style['overflow-y'] = 'hidden';
    },

    /**
    * Restore body overflow property
    * @private
    */
    _restoreBodyOverflow: function _restoreBodyOverflow() {
        document.body.style['overflow-y'] = 'auto';
    },

    /**
    * Component will unmount event handler.
    * Remove the mouse wheel listener.
    */
    componentWillUnmount: function componentWillUnmount() {
        // ReactDOM.findDOMNode(this.refs.overlay).removeEventListener('mousewheel', this._onScroll);
        this._restoreBodyOverflow();
    },

    /**
    * Render the component
    * @return {XML} the rendered HTML
    */
    render: function render() {
        var _props = this.props,
            children = _props.children,
            clickHandler = _props.clickHandler,
            show = _props.show;

        return _react2.default.createElement(
            'div',
            { className: 'animated fadeIn', 'data-animation': 'fadeIn', 'data-closing-animation': 'fadeOut', 'data-focus': 'popin-overlay', 'data-visible': show, onClick: clickHandler, ref: 'overlay' },
            children
        );
    }
});

/**
* The popin component configuration
* @type {Object}
*/
var popin = {
    /**
    * Init the component.
    * The popin is closed by default.
    * @return {Object} the initial state
    */
    getInitialState: function getInitialState() {
        return {
            opened: this.props.open
        };
    },

    /**
    * Init the props if not provided.
    * By default, a popin is full, medium and modal.
    * @return {Object} the default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            modal: true,
            size: 'medium',
            type: 'full',
            level: 0,
            overlay: true,
            open: false
        };
    },

    /**
    * Helper attribute, for React debugging
    */
    displayName: 'Popin',
    /**
    * Properties validation
    */
    propTypes: {
        modal: (0, _types2.default)('bool'),
        size: (0, _types2.default)('string'),
        types: (0, _types2.default)('string'),
        level: (0, _types2.default)('number'),
        overlay: (0, _types2.default)('bool'),
        open: (0, _types2.default)('bool')
    },
    /**
    * Wheel event handler.
    * @param  {object} event wheel event
    */
    _onWheel: function _onWheel(event) {
        _reactDom2.default.findDOMNode(this.refs['popin-window']).scrollTop += 0 < event.deltaY ? 100 : -100;
    },

    /**
    * Toggle the popin's open state
    */
    toggleOpen: function toggleOpen() {
        var _this = this;

        var timeout = 0;
        var opened = this.state.opened;
        var onPopinClose = this.props.onPopinClose;

        if (opened) {
            var popinWindow = _reactDom2.default.findDOMNode(this.refs['popin-window']);
            var popinOverlay = _reactDom2.default.findDOMNode(this.refs['popin-overlay']);
            popinWindow.classList.remove(popinWindow.getAttribute('data-animation'));
            popinWindow.classList.add(popinWindow.getAttribute('data-closing-animation'));
            popinOverlay.classList.remove(popinOverlay.getAttribute('data-animation'));
            popinOverlay.classList.add(popinOverlay.getAttribute('data-closing-animation'));
            timeout = 200;
        }
        if (opened && onPopinClose) {
            onPopinClose();
        }
        this._openTimeoutID = setTimeout(function () {
            // Store the current popin state
            var wasOpened = _this.state.opened;
            // If it was  opened, then we are closing it, so restore the body overflow before closing.
            if (wasOpened && _this.refs['popin-overlay']) {
                _this.refs['popin-overlay']._restoreBodyOverflow();
            }
            _this.setState({
                opened: !wasOpened
            }, function () {
                if (_this.refs['popin-overlay']) {
                    if (!wasOpened) {
                        // We just opened the popin, so store and hide the body overflow.
                        _this.refs['popin-overlay']._hideBodyOverflow();
                    }
                }
            });
        }, timeout);
    },
    componentWillUnmount: function componentWillUnmount() {
        window.clearTimeout(this._openTimeoutID);
    },

    /**
    * Render the component
    * @return {XML} the rendered HTML
    */
    render: function render() {
        // test for this.state.opened and return an Overlay component if true
        var _props2 = this.props,
            type = _props2.type,
            level = _props2.level,
            modal = _props2.modal,
            overlay = _props2.overlay,
            children = _props2.children;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'popin', 'data-level': level, 'data-size': this._validateSize(), 'data-type': type },
            this.state.opened && _react2.default.createElement(
                Overlay,
                { clickHandler: modal && this.toggleOpen, ref: 'popin-overlay', resize: 'full' === type, show: overlay },
                _react2.default.createElement(
                    'div',
                    _extends({}, this._getAnimationProps(), { 'data-focus': 'popin-window', onClick: this._preventPopinClose, ref: 'popin-window' }),
                    _react2.default.createElement(
                        'i',
                        { className: 'material-icons', 'data-focus': 'popin-window-close', onClick: this.toggleOpen },
                        'close'
                    ),
                    _react2.default.createElement(
                        'div',
                        { onWheel: this._onWheel },
                        children
                    )
                )
            )
        );
    },

    /**
    * Compute the animation classes
    * @return {Object} the props to attach to the component
    * @private
    */
    _getAnimationProps: function _getAnimationProps() {
        var openingAnimation = void 0;
        var closingAnimation = void 0;
        switch (this.props.type) {
            case 'from-menu':
                openingAnimation = 'slideInLeft';
                closingAnimation = 'slideOutLeft';
                break;
            case 'from-right':
                openingAnimation = 'slideInRight';
                closingAnimation = 'slideOutRight';
                break;
            default:
                openingAnimation = 'zoomIn';
                closingAnimation = 'zoomOut';
                break;
        }
        return {
            className: 'animated ' + openingAnimation,
            'data-animation': openingAnimation,
            'data-closing-animation': closingAnimation
        };
    },

    /**
    * Validate the optional given size
    * @return {string} the validated size
    * @private
    */
    _validateSize: function _validateSize() {
        var _this2 = this;

        if (!['small', 'medium', 'large'].find(function (size) {
            return size === _this2.props.size;
        })) {
            throw new _exception.ArgumentInvalidException('Please provide a valid popin size among small, medium and large. Provided ' + this.props.size);
        }
        return this.props.size;
    },

    /**
    * Prevent popin close when there's a click on the popin window
    * @param {Object} event - raised by the click
    * @private
    */
    _preventPopinClose: function _preventPopinClose(event) {
        event.stopPropagation();
    }
};

module.exports = (0, _builder2.default)(popin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJPdmVybGF5IiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImNoaWxkcmVuIiwib2JqZWN0IiwiY2xpY2tIYW5kbGVyIiwiZnVuYyIsInNob3ciLCJib29sIiwiZ2V0RGVmYXVsdFByb3BzIiwiX2hpZGVCb2R5T3ZlcmZsb3ciLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIl9yZXN0b3JlQm9keU92ZXJmbG93IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJwcm9wcyIsInBvcGluIiwiZ2V0SW5pdGlhbFN0YXRlIiwib3BlbmVkIiwib3BlbiIsIm1vZGFsIiwic2l6ZSIsInR5cGUiLCJsZXZlbCIsIm92ZXJsYXkiLCJ0eXBlcyIsIl9vbldoZWVsIiwiZXZlbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzY3JvbGxUb3AiLCJkZWx0YVkiLCJ0b2dnbGVPcGVuIiwidGltZW91dCIsInN0YXRlIiwib25Qb3BpbkNsb3NlIiwicG9waW5XaW5kb3ciLCJwb3Bpbk92ZXJsYXkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnZXRBdHRyaWJ1dGUiLCJhZGQiLCJfb3BlblRpbWVvdXRJRCIsInNldFRpbWVvdXQiLCJ3YXNPcGVuZWQiLCJzZXRTdGF0ZSIsIndpbmRvdyIsImNsZWFyVGltZW91dCIsIl92YWxpZGF0ZVNpemUiLCJfZ2V0QW5pbWF0aW9uUHJvcHMiLCJfcHJldmVudFBvcGluQ2xvc2UiLCJvcGVuaW5nQW5pbWF0aW9uIiwiY2xvc2luZ0FuaW1hdGlvbiIsImNsYXNzTmFtZSIsImZpbmQiLCJzdG9wUHJvcGFnYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztrUUFBQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7OztBQUdBLElBQU1BLFVBQVUsZ0JBQU1DLFdBQU4sQ0FBa0I7QUFD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O0FBSHRCLFNBQVI7QUFLSCxLQXpJUzs7QUEwSVY7Ozs7O0FBS0FKLGlCQS9JVSwyQkErSU07QUFBQTs7QUFDWixZQUFJLENBQUMsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQixPQUFwQixFQUE2Qk0sSUFBN0IsQ0FBa0M7QUFBQSxtQkFBUWpDLFNBQVMsT0FBS04sS0FBTCxDQUFXTSxJQUE1QjtBQUFBLFNBQWxDLENBQUwsRUFBMEU7QUFDdEUsa0JBQU0sd0NBQTZCLCtFQUErRSxLQUFLTixLQUFMLENBQVdNLElBQXZILENBQU47QUFDSDtBQUNELGVBQU8sS0FBS04sS0FBTCxDQUFXTSxJQUFsQjtBQUNILEtBcEpTOztBQXFKVjs7Ozs7QUFLQTZCLHNCQTFKVSw4QkEwSlN2QixLQTFKVCxFQTBKZ0I7QUFDdEJBLGNBQU00QixlQUFOO0FBQ0g7QUE1SlMsQ0FBZDs7QUErSkFDLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVF6QyxLQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuaW1wb3J0IHtBcmd1bWVudEludmFsaWRFeGNlcHRpb259IGZyb20gJ2ZvY3VzLWNvcmUvZXhjZXB0aW9uJztcclxuXHJcbi8qKlxyXG4qIFNtYWxsIG92ZXJsYXkgY29tcG9uZW50IHVzZWQgdG8gbGlzdGVuIHRvIHNjcm9sbCBhbmQgcHJldmVudCBpdCB0byBsZWF2ZSB0aGUgUG9waW4gY29tcG9uZW50XHJcbiovXHJcbmNvbnN0IE92ZXJsYXkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1BvcGluT3ZlcmxheScsXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBjbGlja0hhbmRsZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIHNob3c6IFByb3BUeXBlcy5ib29sXHJcbiAgICB9LFxyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7c2hvdzogZmFsc2V9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTdG9yZSB0aGUgYm9keSBvdmVyZ2Zsb3cgcHJvcGVydHksIGFuZCBzZXQgaXQgdG8gaGlkZGVuXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX2hpZGVCb2R5T3ZlcmZsb3coKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZVsnb3ZlcmZsb3cteSddID0gJ2hpZGRlbic7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlc3RvcmUgYm9keSBvdmVyZmxvdyBwcm9wZXJ0eVxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9yZXN0b3JlQm9keU92ZXJmbG93KCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGVbJ292ZXJmbG93LXknXSA9ICdhdXRvJztcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IHdpbGwgdW5tb3VudCBldmVudCBoYW5kbGVyLlxyXG4gICAgKiBSZW1vdmUgdGhlIG1vdXNlIHdoZWVsIGxpc3RlbmVyLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIC8vIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5vdmVybGF5KS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgdGhpcy5fb25TY3JvbGwpO1xyXG4gICAgICAgIHRoaXMuX3Jlc3RvcmVCb2R5T3ZlcmZsb3coKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgSFRNTFxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7Y2hpbGRyZW4sIGNsaWNrSGFuZGxlciwgc2hvd30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhbmltYXRlZCBmYWRlSW4nIGRhdGEtYW5pbWF0aW9uPSdmYWRlSW4nIGRhdGEtY2xvc2luZy1hbmltYXRpb249J2ZhZGVPdXQnIGRhdGEtZm9jdXM9J3BvcGluLW92ZXJsYXknIGRhdGEtdmlzaWJsZT17c2hvd30gb25DbGljaz17Y2xpY2tIYW5kbGVyfSByZWY9J292ZXJsYXknPlxyXG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4qIFRoZSBwb3BpbiBjb21wb25lbnQgY29uZmlndXJhdGlvblxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IHBvcGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIEluaXQgdGhlIGNvbXBvbmVudC5cclxuICAgICogVGhlIHBvcGluIGlzIGNsb3NlZCBieSBkZWZhdWx0LlxyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBpbml0aWFsIHN0YXRlXHJcbiAgICAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICBvcGVuZWQ6IHRoaXMucHJvcHMub3BlblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBJbml0IHRoZSBwcm9wcyBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICAqIEJ5IGRlZmF1bHQsIGEgcG9waW4gaXMgZnVsbCwgbWVkaXVtIGFuZCBtb2RhbC5cclxuICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpemU6ICdtZWRpdW0nLFxyXG4gICAgICAgICAgICB0eXBlOiAnZnVsbCcsXHJcbiAgICAgICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgICAgICBvdmVybGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBvcGVuOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBIZWxwZXIgYXR0cmlidXRlLCBmb3IgUmVhY3QgZGVidWdnaW5nXHJcbiAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdQb3BpbicsXHJcbiAgICAvKipcclxuICAgICogUHJvcGVydGllcyB2YWxpZGF0aW9uXHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbW9kYWw6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgc2l6ZTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHR5cGVzOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgbGV2ZWw6IHR5cGVzKCdudW1iZXInKSxcclxuICAgICAgICBvdmVybGF5OiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIG9wZW46IHR5cGVzKCdib29sJylcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogV2hlZWwgZXZlbnQgaGFuZGxlci5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCB3aGVlbCBldmVudFxyXG4gICAgKi9cclxuICAgIF9vbldoZWVsKGV2ZW50KSB7XHJcbiAgICAgICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzWydwb3Bpbi13aW5kb3cnXSkuc2Nyb2xsVG9wICs9IDAgPCBldmVudC5kZWx0YVkgPyAxMDAgOiAtMTAwO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBUb2dnbGUgdGhlIHBvcGluJ3Mgb3BlbiBzdGF0ZVxyXG4gICAgKi9cclxuICAgIHRvZ2dsZU9wZW4oKSB7XHJcbiAgICAgICAgbGV0IHRpbWVvdXQgPSAwO1xyXG4gICAgICAgIGNvbnN0IHtvcGVuZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7b25Qb3BpbkNsb3NlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKG9wZW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBwb3BpbldpbmRvdyA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1sncG9waW4td2luZG93J10pO1xyXG4gICAgICAgICAgICBjb25zdCBwb3Bpbk92ZXJsYXkgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXSk7XHJcbiAgICAgICAgICAgIHBvcGluV2luZG93LmNsYXNzTGlzdC5yZW1vdmUocG9waW5XaW5kb3cuZ2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicpKTtcclxuICAgICAgICAgICAgcG9waW5XaW5kb3cuY2xhc3NMaXN0LmFkZChwb3BpbldpbmRvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvc2luZy1hbmltYXRpb24nKSk7XHJcbiAgICAgICAgICAgIHBvcGluT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKHBvcGluT3ZlcmxheS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJykpO1xyXG4gICAgICAgICAgICBwb3Bpbk92ZXJsYXkuY2xhc3NMaXN0LmFkZChwb3Bpbk92ZXJsYXkuZ2V0QXR0cmlidXRlKCdkYXRhLWNsb3NpbmctYW5pbWF0aW9uJykpO1xyXG4gICAgICAgICAgICB0aW1lb3V0ID0gMjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3BlbmVkICYmIG9uUG9waW5DbG9zZSkge1xyXG4gICAgICAgICAgICBvblBvcGluQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb3BlblRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgY3VycmVudCBwb3BpbiBzdGF0ZVxyXG4gICAgICAgICAgICBjb25zdCB3YXNPcGVuZWQgPSB0aGlzLnN0YXRlLm9wZW5lZDtcclxuICAgICAgICAgICAgLy8gSWYgaXQgd2FzICBvcGVuZWQsIHRoZW4gd2UgYXJlIGNsb3NpbmcgaXQsIHNvIHJlc3RvcmUgdGhlIGJvZHkgb3ZlcmZsb3cgYmVmb3JlIGNsb3NpbmcuXHJcbiAgICAgICAgICAgIGlmICh3YXNPcGVuZWQgJiYgdGhpcy5yZWZzWydwb3Bpbi1vdmVybGF5J10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmc1sncG9waW4tb3ZlcmxheSddLl9yZXN0b3JlQm9keU92ZXJmbG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBvcGVuZWQ6ICF3YXNPcGVuZWRcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmc1sncG9waW4tb3ZlcmxheSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3YXNPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UganVzdCBvcGVuZWQgdGhlIHBvcGluLCBzbyBzdG9yZSBhbmQgaGlkZSB0aGUgYm9keSBvdmVyZmxvdy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzWydwb3Bpbi1vdmVybGF5J10uX2hpZGVCb2R5T3ZlcmZsb3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fb3BlblRpbWVvdXRJRCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XHJcbiAgICAqIEByZXR1cm4ge1hNTH0gdGhlIHJlbmRlcmVkIEhUTUxcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7IC8vIHRlc3QgZm9yIHRoaXMuc3RhdGUub3BlbmVkIGFuZCByZXR1cm4gYW4gT3ZlcmxheSBjb21wb25lbnQgaWYgdHJ1ZVxyXG4gICAgICAgIGNvbnN0IHt0eXBlLCBsZXZlbCwgbW9kYWwsIG92ZXJsYXksIGNoaWxkcmVufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdwb3BpbicgZGF0YS1sZXZlbD17bGV2ZWx9IGRhdGEtc2l6ZT17dGhpcy5fdmFsaWRhdGVTaXplKCl9IGRhdGEtdHlwZT17dHlwZX0gPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUub3BlbmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPE92ZXJsYXkgY2xpY2tIYW5kbGVyPXttb2RhbCAmJiB0aGlzLnRvZ2dsZU9wZW59IHJlZj0ncG9waW4tb3ZlcmxheScgcmVzaXplPXsnZnVsbCcgPT09IHR5cGV9IHNob3c9e292ZXJsYXl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLl9nZXRBbmltYXRpb25Qcm9wcygpfSBkYXRhLWZvY3VzPSdwb3Bpbi13aW5kb3cnIG9uQ2xpY2s9e3RoaXMuX3ByZXZlbnRQb3BpbkNsb3NlfSByZWY9J3BvcGluLXdpbmRvdyc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJyBkYXRhLWZvY3VzPSdwb3Bpbi13aW5kb3ctY2xvc2UnIG9uQ2xpY2s9e3RoaXMudG9nZ2xlT3Blbn0+Y2xvc2U8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IG9uV2hlZWw9e3RoaXMuX29uV2hlZWx9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L092ZXJsYXk+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXB1dGUgdGhlIGFuaW1hdGlvbiBjbGFzc2VzXHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIHByb3BzIHRvIGF0dGFjaCB0byB0aGUgY29tcG9uZW50XHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX2dldEFuaW1hdGlvblByb3BzKCkge1xyXG4gICAgICAgIGxldCBvcGVuaW5nQW5pbWF0aW9uO1xyXG4gICAgICAgIGxldCBjbG9zaW5nQW5pbWF0aW9uO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Zyb20tbWVudSc6XHJcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3NsaWRlSW5MZWZ0JztcclxuICAgICAgICAgICAgICAgIGNsb3NpbmdBbmltYXRpb24gPSAnc2xpZGVPdXRMZWZ0JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdmcm9tLXJpZ2h0JzpcclxuICAgICAgICAgICAgICAgIG9wZW5pbmdBbmltYXRpb24gPSAnc2xpZGVJblJpZ2h0JztcclxuICAgICAgICAgICAgICAgIGNsb3NpbmdBbmltYXRpb24gPSAnc2xpZGVPdXRSaWdodCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG9wZW5pbmdBbmltYXRpb24gPSAnem9vbUluJztcclxuICAgICAgICAgICAgICAgIGNsb3NpbmdBbmltYXRpb24gPSAnem9vbU91dCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogYGFuaW1hdGVkICR7b3BlbmluZ0FuaW1hdGlvbn1gLFxyXG4gICAgICAgICAgICAnZGF0YS1hbmltYXRpb24nOiBvcGVuaW5nQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAnZGF0YS1jbG9zaW5nLWFuaW1hdGlvbic6IGNsb3NpbmdBbmltYXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogVmFsaWRhdGUgdGhlIG9wdGlvbmFsIGdpdmVuIHNpemVcclxuICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgdmFsaWRhdGVkIHNpemVcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfdmFsaWRhdGVTaXplKCkge1xyXG4gICAgICAgIGlmICghWydzbWFsbCcsICdtZWRpdW0nLCAnbGFyZ2UnXS5maW5kKHNpemUgPT4gc2l6ZSA9PT0gdGhpcy5wcm9wcy5zaXplKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRJbnZhbGlkRXhjZXB0aW9uKCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIHBvcGluIHNpemUgYW1vbmcgc21hbGwsIG1lZGl1bSBhbmQgbGFyZ2UuIFByb3ZpZGVkICcgKyB0aGlzLnByb3BzLnNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zaXplO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBQcmV2ZW50IHBvcGluIGNsb3NlIHdoZW4gdGhlcmUncyBhIGNsaWNrIG9uIHRoZSBwb3BpbiB3aW5kb3dcclxuICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gcmFpc2VkIGJ5IHRoZSBjbGlja1xyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9wcmV2ZW50UG9waW5DbG9zZShldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKHBvcGluKTtcclxuIl19