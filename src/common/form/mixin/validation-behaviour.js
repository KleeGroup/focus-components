//Dependencies.
import {isEmpty, isFunction} from 'lodash';
import assign from 'object-assign';

/**
* Validate each field of the form.
* In case of errors the state is modified.
* @returns {boolean} - A boolean true if the validation is correct.
*/
function _fieldsValidation() {
    let validationMap = {};
    for (let inptKey in this.refs) {
        //validate only the reference elements which have valide function
        if(isFunction(this.refs[inptKey].validate)) {
            let validationRes = this.refs[inptKey].validate();
            if(validationRes !== undefined) {
                assign(validationMap, {
                    [inptKey]: validationRes
                });
            }
        }
    }
    if(isEmpty(validationMap)) {
        return true;
    }
    return false;
}
/**
 * Custom validation of the field.
 * @return {true} -  If the custom validation is defined.
 */
function _customValidation() {
    if(this.customValidation) {
        return this.customValidation();
    }
    return true;
}
/**
 * Validate .
 * @return {boolean} - True if the validation is ok.
 */
function _validate() {
    return this._fieldsValidation() && this._customValidation();
}

/**
 * Validate the form
 * @deprecated
 * @return {object} - The validation  result.
 */
function validate() {
    console.warn('This function will be deprecated in the version 0.6.0 the validate function should be custom for the project, instead call this._validate');
    return this._validate();
}
export {
    _fieldsValidation,
    _customValidation,
    _validate,
    validate
}

export default {
    _fieldsValidation,
    _customValidation,
    _validate,
    validate
}
