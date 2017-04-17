
let i18nMixin = require('../../i18n').mixin;
import validate from 'focus-core/definition/validator/validate';
let {isNull, isUndefined, isFunction} = require('lodash/lang');
let validationMixin ={
    mixins: [i18nMixin],
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            isRequired: false,
            validator: undefined
        };
    },
    /**
    * Compute the validation status and merge all errors into one.
    * @param  {object} validationStatus - The result from the validation.
    * @return {true | string} - true if the validation is ok and a message if it is not the case.
    */
    _computeValidationStatus(validationStatus) {
        if(validationStatus.isValid) {
            return true;
        }
        return validationStatus.errors.join(', ');
    },
    /**
    * Validate the input.
    * @return {object}
    */
    validateInput: function validateInputText() {
        const shouldComponentHandleValidation = this.refs && this.refs.input && isFunction(this.refs.input.validate);
        let value = this.getValue();
        let {isRequired, validator, label} = this.props;
        if (isRequired && (undefined === value || null === value)) {
            return this.i18n('field.required', {name: this.i18n(label)});
        }
        //The validation is performed only when the field has a value, otherwise, only the required validation is performed.
        if (validator && !isUndefined(value) && !isNull(value)) {
            let validStat = this._computeValidationStatus(
                validate.call(
                    this,
                    {value: value, name: this.i18n(label)},
                    validator
                )
            );
            if(true !== validStat) {
                validStat = this.i18n(validStat);
            }
            return validStat;
        }
        return shouldComponentHandleValidation ? this._customValidate(this.refs.input) : true;
    },
    _customValidate({validate: componentValidation}) {
        const {isValid, message} = componentValidation();
        return isValid ? true : this.i18n(message);
    },
    /**
    * Validate the field.
    * @return {object} - undefined if valid, {name: "errors"} if not valid.
    */
    validate() {
        const isValid = this.validateInput();
        if(true !== isValid) {
            this.setError(isValid);
            return isValid;
        }
    },
    /**
    * Set the error on the field.
    * @param error Error to set.
    */
    setError: function setErrorOnField(error) {
        this.setState({ error: error });
    }
};
module.exports = validationMixin;
