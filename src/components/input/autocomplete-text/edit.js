import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {debounce} from 'lodash';


import ComponentBaseBehaviour from '../../../behaviours/component-base';
import MDBehaviour from '../../../behaviours/material';


@MDBehaviour('materialInput')
@MDBehaviour('loader')
@ComponentBaseBehaviour
class AutocompleteTextEdit extends Component {
    static defaultProps = {
        placeholder: 'Search here...',
        showAtFocus: false,
        emptyShowAll: false,
        inputTimeout: 200
    };

    static propTypes = {
        /**
        * Returns a promise which is connected to the web service.
        * @type {Function}
        */
        querySearcher: PropTypes.func.isRequired,

        /**
        * Field value.
        * @type {String}
        */
        value: PropTypes.string,

        /**
        * Launches the querySearcher.
        * @type {Function}
        */
        onChange: PropTypes.func,

        /**
        * Error showed message.
        * @type {String}
        */
        error: PropTypes.string,

        /**
        * Placeholder field.
        * @type {String}
        */
        placeholder: PropTypes.string,

        /**
        * Defines it shows suggestions on focus.
        * @type {Boolean}
        */
        showAtFocus: PropTypes.bool,

        /**
        * Defines if it shows suggestions on focus when the input is empty.
        * @type {Boolean}
        */
        emptyShowAll: PropTypes.bool,

        /**
         * [inputTimeout description]
         * @type {number}
         */
        inputTimeout: PropTypes.number.isRequired
    };

    state = {
        inputValue: this.props.value,
        suggestions: [],
        hasSuggestions: false,
        error: this.props.error,
        hasFocus: false,
        isLoading: false
    };

    componentWillReceiveProps({error}) {
        if(error) {
            this.setState({error: error});
        }
    }

    componentDidMount() {
        const {inputTimeout} = this.props;
        this._debouncedQuerySearcher = debounce(this._querySearcher, inputTimeout);
    }

    // Returns the state's inputValue
    getValue = () => {
        const {inputValue} = this.state;
        if(inputValue !== undefined) {
            return inputValue;
        } else {
            return null;
        }
    };

    // Gets the defined props' querySearch and returns the object given by the promise
    // Sets the hasSuggestions' state if the given object has a none empty array
    _querySearcher = value => {
        const {querySearcher} = this.props;
        const {hasSuggestions} = this.state;

        querySearcher(value).then(({data, totalCount}) => {
            if(totalCount > 0) {
                this.setState({hasSuggestions: true, suggestions: data, error: ''});
            }
            this.refs.loader.classList.remove('mdl-progress__indeterminate');
            this.setState({isLoading: false});
        }).catch(err => {
            this.refs.loader.classList.remove('mdl-progress__indeterminate');
            this.setState({error: JSON.stringify(err), isLoading: false});
            this.refs.materialInput.classList.add('is-invalid');
        });
    };

    // Sets the state's inputValue when the user is typing
    onQueryChange = ({target: {value}}) => {
        this.setState({inputValue: value});
        if(value.trim() == '') {
            this.setState({hasSuggestions: false});
        } else {
            this.refs.loader.classList.add('mdl-progress__indeterminate');
            this.setState({isLoading: true});
            this._debouncedQuerySearcher(value);
            // this._querySearcher(value);
        }
    };

    // Sets the value input with the selected suggestion and hides the dropdown
    onResultClick(value) {
        this.refs.inputText.value = value;
        this.setState({inputValue: value, hasSuggestions: false, suggestions: []});
        return value;
    }

    // Returns an html list whith the Suggestions
    renderSuggestions = () => {
        const {suggestions} = this.state;
        const allSuggestions = suggestions.map(({key, label}) => <li key={key} onMouseDown={(e) => {this.onResultClick(label); e.preventDefault();}} data-focus='option' >{label}</li>);
        return(
            <ul ref='suggestions' data-focus='options'>
                {allSuggestions}
            </ul>
        );
    };

    // Behaviour when onFocus and onBlur are triggered
    toggleHasFocus = e => {
        const {hasSuggestions, hasFocus} = this.state;
        const {showAtFocus, emptyShowAll} = this.props;
        this.setState({hasFocus: !this.state.hasFocus});
        if(hasSuggestions && !showAtFocus && hasFocus === false) {
            this.setState({hasSuggestions: false});
        }
        if(!hasSuggestions && e.target.value.trim() === '' && emptyShowAll && hasFocus === false) {
            // Doing a global search here
            this._querySearcher('');
        }
        return true;
    };

    // Maybe give the option for the floating label
    render() {
        const {inputValue, hasSuggestions, hasFocus, isLoading, ...otherProps} = this.state;
        const {placeholder, inputTimeout, showAtFocus, emptyShowAll, error} = this.props
        return(
            <div data-focus='autocompleteText'>
                <div className={`mdl-textfield mdl-js-textfield${error ? ' is-invalid' : ''}`} ref='materialInput'>
                    <div data-focus='loading' data-loading={isLoading} className='mdl-progress mdl-js-progress' ref='loader'/>
                    <input onFocus={this.toggleHasFocus} onBlur={this.toggleHasFocus} className='mdl-textfield__input' type='text' value={!inputValue ? '' : inputValue} ref='inputText' onChange={::this.onQueryChange} showAtFocus={showAtFocus} emptyShowAll={emptyShowAll} {...otherProps} />
                    <label className='mdl-textfield__label'>{this.i18n(placeholder)}</label>
                    <span className='mdl-textfield__error' ref='errorMessage'>{this.i18n(error)}</span>
                </div>
                {hasSuggestions && hasFocus &&
                    this.renderSuggestions()
                }
            </div>
        );
    }
}

export default AutocompleteTextEdit;

/*
EXAMPLE
const _querySearcher = query => {
    let data = [
        {
            key: 'JL',
            label: 'Joh Lickeur'
        },
        {
            key: 'GK',
            label: 'Guénolé Kikabou'
        },
        {
            key: 'YL',
            label: 'Yannick Lounivis'
        }
    ];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data,
                totalCount: data.length
            });
        }, 500);
    });
};

<AutocompleteText
    isEdit={isEdit}
    querySearcher={_querySearcher}
    placeholder={'Your search...'}
    error{Something wrong happend. Retry please...}
/>
*/
