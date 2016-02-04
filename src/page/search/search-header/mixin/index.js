const React = require('react');
const referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
const storeBehaviour = require('../../../../common/mixin/store-behaviour');

// Components
const SearchBar = require('../../../../search/search-bar').component;

// Actions
import actionBuilder from 'focus-core/search/action-builder';

// Store
import {advancedSearchStore} from 'focus-core/search/built-in-store';

module.exports = {
    mixins: [referenceBehaviour, storeBehaviour],
    referenceNames: ['scopes'],
    getDefaultProps() {
        return {
            service: undefined,
            store: advancedSearchStore,
            onSearchCriteriaChange: undefined,
            onSearchCriteriaChangeByUser: undefined
        };
    },
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentWillMount() {
        this._loadReference();
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getSearchOptions: () => {return this.props.store.getValue.call(this.props.store); } // Binding the store in the function call
        });
        advancedSearchStore.addQueryChangeListener(this._onSearchCriteriaChange);
        advancedSearchStore.addScopeChangeListener(this._onSearchCriteriaChange);
    },
    componentWillUnmount() {
        advancedSearchStore.removeQueryChangeListener(this._onSearchCriteriaChange);
        advancedSearchStore.removeScopeChangeListener(this._onSearchCriteriaChange);
    },
    _onSearchCriteriaChange() {
        const {onSearchCriteriaChange} = this.props;
        if (onSearchCriteriaChange) {
            onSearchCriteriaChange();
        }
    },
    _SearchBarComponent() {
        const {helpTranslationPath, minChar, onSearchCriteriaChangeByUser, placeholder} = this.props;
        const {isLoading, reference: {scopes}} = this.state;
        return (
            <SearchBar
                action={this._action}
                helpTranslationPath={helpTranslationPath}
                loading={isLoading}
                minChar={minChar}
                placeholder={placeholder}
                ref='searchBar'
                scopes={scopes}
                store={advancedSearchStore}
                onSearchCriteriaChangeByUser={onSearchCriteriaChangeByUser} />
        );
    }
};
