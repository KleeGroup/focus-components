const React = require('react');
const {builder, types} = require('focus').component;
const i18nMixin = require('../../i18n/mixin');
const stylableMixin = require('../../../mixin/stylable');
//const Icon = require('../../icon').component;
const BTN_JS = 'mdl-button-js';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';

const oneOf = React.PropTypes.oneOf;
const materialBehaviour = require('../../mixin/mdl-behaviour');
/**
 * Mixin button.
 * @type {Object}
 */
const buttonMixin = {
        /** inheritedDoc */
        mixins: [i18nMixin, stylableMixin, materialBehaviour],
        /** inheritedDoc */
        getDefaultProps() {
            return {
                type: 'submit',
                shape: 'raised',
                action: undefined,
                label: '',
                icon: '',
                hasRipple: false,
                isJs: false,
                iconLibrary: 'material'
            };
        },
        propTypes: {
            label: types('string'),
            action: types('function'),
            handleOnClick: types('function'),
            type: oneOf(['submit', 'button']),
            shape: oneOf([undefined, 'raised', 'fab', 'mini', 'icon']),
            color: oneOf([undefined, 'colored', 'primary', 'accent']),
            hasRipple: types('bool'),
            isJs: types('bool'),
            icon: types('string'),
            iconLibrary: oneOf(['material', 'font-awesome', 'focus'])
        },
        /**
         * Handle click event.
         * @return {Object} - Action call.
         */
        handleOnClick() {
            const {handleOnClick, action} = this.props;
            if (handleOnClick) {
                return handleOnClick.apply(this, arguments);
            }
            if (!action || !this.action[action]) {
                return console.warn('Your button action is not implemented');
            }
            return this.action[this.props.action].apply(this, arguments);
        },
        /**
         * Date de composant.
         * @return {string} Classe.
         */
        _className() {
            const {shape, color, hasRipple, isJs} = this.props;
            const SHAPE_CLASS = shape ? `${BUTTON_PRFX}${shape}` : '';
            const COLOR_CLASS = color ? `${BUTTON_PRFX}${color}` : '';
            const JS_CLASS = isJs ? BTN_JS : '';
            const RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
            return `${BTN_CLASS} ${COLOR_CLASS} ${SHAPE_CLASS} ${JS_CLASS} ${RIPPLE_EFFECT_CLASS}`;
        },
        /**
         * Render the pressed button.
         * @return {Component} - Component button.
         */
        renderPressedButton () {
            return (<button>Loading...</button>);
        },
        /**
         * Render an icon.
         * @return {Component} - Composant icone.
         */
        _renderIcon() {
            const {icon, iconLibrary} = this.props;
            if ('material' === iconLibrary) {
                return <i className='material-icons'>{icon}</i>;
            }
            return null;
        },
        /**
         * Render the label.
         * @return {Component} - Tle button label.
         */
        _renderLabel () {
            const {label, shape} = this.props;
            if (label && 'fab' !== shape) {
                return this.i18n(label);
            }
            return '';
        },
        /** inheritedDoc */
        render() {
            const {type, label} = this.props;
            return (
                <button alt={label} className={this._className()} onClick={this.handleOnClick} title={label} type={type}>
                    {this._renderIcon()}
                    {this._renderLabel()}
                </button>
            );
        }
    }
    ;

module.exports = builder(buttonMixin);
