// Dependencies

const builder = require('focus').component.builder;
const type = require('focus').component.types;
const React = require('react');
const actionWrapper = require('../../page/search/search-header/action-wrapper');
const {bar: style} = require('./style');

// Components

const Scope = require('./scope').component;
const Input = require('../../common/input/text').component;

// Mixins

const stylable = require('../../mixin/stylable');
const i18n = require('../../common/i18n/mixin');

/**
 * SearchBar component
 * @type {Object}
 */
const SearchBar = {
    mixins: [i18n, stylable],
    displayName: 'SearchBar',
    /**
    * Component default properties.
    * @return {Object} the default props.
    */
    getDefaultProps() {
        return {
            placeholder: 'Enter your search here...',
            scopes: [],
            minChar: 0,
            loading: false,
            helpTranslationPath: 'search.bar.help',
            hasScopes: true,
            identifier: undefined,
            store: undefined,
            action: undefined
        };
    },
    propTypes: {
        placeholder: type('string'),
        value: type('string'),
        scopes: type('array'),
        minChar: type('number'),
        loading: type('bool'),
        helpTranslationPath: type('string'),
        hasScopes: type('bool')
    },
    /**
    * Get the initial state
    * @return {Object} the initial state
    */
    getInitialState() {
        return {
            loading: this.props.loading,
            scope: this.props.store.getScope(),
            query: this.props.store.getQuery()
        };
    },
    /**
     * Component did mount handler
     */
    componentDidMount() {
        this._focusQuery();
    },
    /**
     * Component will mount handler
     */
    componentWillMount() {
        this.props.store.addQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.addScopeChangeListener(this._onScopeChangeFromStore);
    },
    /**
     * Component did unmount handler
     */
    componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this._onQueryChangeFromStore);
        this.props.store.removeScopeChangeListener(this._onScopeChangeFromStore);
    },
    /**
     * Query changed in store event handler
     */
    _onQueryChangeFromStore() {
        this.setState({
            query: this.props.store.getQuery()
        });
    },
    /**
     * Scope changed in store event handler
     */
    _onScopeChangeFromStore() {
        this.setState({
            scope: this.props.store.getScope()
        });
    },
    /**
     * Broadcast query change
     */
    _broadcastQueryChange() {
        actionWrapper(() => {
            this.props.action.updateProperties({
                query: React.findDOMNode(this.refs.query).value
            });
        })();
    },
    /**
     * Input change handler
     * @param  {String} query the new query
     */
    _onInputChange({target: {value: query}}) {
        this.setState({query});
        const {minChar} = this.props;
        if (query.length >= minChar) {
            this._broadcastQueryChange();
        }
    },
    /**
     * Scope selection handler
     * @param  {Object} scope selected scope
     */
    _onScopeSelection(scope) {
        this._focusQuery();
        this.props.action.updateProperties({
            scope,
            selectedFacets: {},
            groupingKey: undefined
        });
        this.setState({scope});
    },
    /**
     * Input key press handler
     * @param  {String} key pressed key
     */
    _handleInputKeyPress({key}) {
        if ('Enter' === key) {
            actionWrapper(() => {
                this.props.action.updateProperties({
                    query: React.findDOMNode(this.refs.query).value
                });
            }, null, 0)();
        }
    },
    /**
     * Render help message
     * @return {HTML} rendered help message
     */
    _renderHelp() {
        return (
            <div ref='help' style={style.help}>{this.i18n(this.props.helpTranslationPath)}</div>
        );
    },
    /**
     * Focus the query input field
     */
    _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    /**
    * Render the component.
    * @return {HTML} - The rendered component
    */
    render() {
        const {loading, hasScopes, placeholder, scopes} = this.props;
        const {query, scope} = this.state;
        return (
            <div data-focus='search-bar' style={style.parent}>
                {hasScopes &&
                    <Scope list={scopes} onScopeSelection={this._onScopeSelection} ref='scope' value={scope}/>
                }
                <div style={style.inputZone}>
                    <Input onChange={this._onInputChange} onKeyPress={this._handleInputKeyPress} placeholder={placeholder} ref='query' style={style.inputField} value={query}/>
                    {loading &&
                        <div className={`sb-spinner three-quarters-loader`} style={style.loader}/>
                    }
                </div>
                {this._renderHelp()}
            </div>
        );
    }
};

module.exports = builder(SearchBar);
