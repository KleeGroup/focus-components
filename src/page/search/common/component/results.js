// Dependencies
const React = require('react');
const builder = require('focus-core').component.builder;
const omit = require('lodash/object/omit');
const map = require('lodash/collection/map');
const reduce = require('lodash/collection/reduce');
const clone = require('lodash/lang/clone');
const keys = require('lodash/object/keys');
const forEach = require('lodash/collection/forEach');
const isEqual = require('lodash/lang/isEqual');
const assign = require('lodash/object/assign');

// Components

const DefaultEmpty = require('./default-empty-component').component;
const ListSelection = require('../../../../list/selection').list.component;
const GroupWrapper = require('./group-wrapper').component;

// Mixins

const i18nMixin = require('../../../../common/i18n/mixin');

/**
 * Results component, used to render the results, grouped or ungrouped
 * @type {Object}
 */
const Results = {
    mixins: [i18nMixin],
    /**
     * By default, an empty component is picked.
     * @return {Object} the default props
     */
    getDefaultProps() {
        return {
            emptyComponent: DefaultEmpty,
            renderSingleGroupDecoration: true,
            initialRowsCount: 3,
            showMoreAdditionalRows: 5,
            scopeFacetKey: 'FCT_SCOPE',
            action: undefined,
            store: undefined,
            resultsMap: undefined,
            selectionResultsMap: undefined,
            totalCount: undefined,
            groupComponent: undefined,
            lineComponentMapper: undefined,
            idField: undefined,
            isSelection: undefined,
            lineSelectionHandler: undefined,
            lineClickHandler: undefined,
            lineOperationList: undefined,
            scrollParentSelector: undefined,
            selectionStatus: undefined,
            groupingKey: undefined,
            resultsFacets: undefined
        };
    },
    /**
     * Initial state
     * @return {Object} Initial state
     */
    getInitialState() {
        return ({
            loading: false
        });
    },
    /**
     * Component will receive props
     */
    componentWillReceiveProps() {
        if (this.state.loading) {
            this.setState({
                loading: false
            });
        }
    },

    /**
     * Render a single group of results, using the group component given as a prop.
     * @param  {array} list the results list
     * @param  {string} key  the group key
     * @param  {int} count  the group's results count
     * @param  {bool} isUnique  is this the only rendered group
     * @return {HMTL}      the rendered group
     */
    _renderSingleGroup(list, key, count, isUnique) {
        const {initialRowsCount} = this.props;
        if(this.props.renderSingleGroupDecoration && !this.props.groupComponent) {
            console.warn('You are trying to wrap your list in a group without a groupComponent. Please give one or set "renderSingleGroupDecoration" to false.');
        }

        if (isUnique) {
            if (this.props.renderSingleGroupDecoration) {
                return (
                    <GroupWrapper
                        count={count}
                        groupComponent={this.props.groupComponent}
                        groupKey={key}
                        initialRowsCount={initialRowsCount}
                        isUnique={true}
                        list={list}
                        ref={`group-${key}`}
                        renderResultsList={this._renderResultsList}
                    />
                );
            } else {
                return this._renderResultsList(list, key, count, true);
            }
        } else {
            return (
                <GroupWrapper
                    count={count}
                    groupComponent={this.props.groupComponent}
                    groupKey={key}
                    initialRowsCount={initialRowsCount}
                    list={list}
                    ref={`group-${key}`}
                    renderResultsList={this._renderResultsList}
                    showAllHandler={this._showAllHandler}
                />
            );
        }
    },
    /**
     * Render the empty component given as a prop when the result map is empty.
     * @return {HMTL}      the rendered component
     */
    _renderEmptyResults() {
        return <this.props.emptyComponent/>;
    },
    /**
     * Render the results list
     * @param  {Array}  list     the results list
     * @param  {string}  key      the group key
     * @param  {integer}  count    the group count
     * @param  {Boolean} isUnique true if this is the only group rendered
     * @return {HTML}          the rendered component
     */
    _renderResultsList(list, key, count, isUnique) {
        let {
            lineComponentMapper,
            idField,
            isSelection,
            lineSelectionHandler,
            lineClickHandler,
            lineOperationList,
            scrollParentSelector,
            selectionStatus,
            selectionResultsMap,
            ...otherProps
        } = this.props;
        let selectionData = selectionResultsMap ? selectionResultsMap[key] || [] : [];
        let LineComponent = lineComponentMapper(key, list);
        let hasMoreData = isUnique !== undefined && isUnique && list.length < count;
        return (
            <div>
                <ListSelection
                    data={list}
                    data-focus='results-list'
                    fetchNextPage={this._onScrollReachedBottom}
                    hasMoreData={hasMoreData}
                    idField={idField}
                    isSelection={isSelection}
                    LineComponent={LineComponent}
                    onLineClick={lineClickHandler}
                    onSelection={lineSelectionHandler}
                    operationList={lineOperationList}
                    parentSelector={scrollParentSelector}
                    ref={`list-${key}`}
                    selectionData={selectionData}
                    selectionStatus={selectionStatus}
                    {...otherProps}
                />
                {this.state.loading &&
                    <div data-focus='loading-more-results'>
                        <i className='fa fa-spinner'></i>
                        {this.i18n('search.loadingMore')}
                    </div>
                }
            </div>
        );
    },

    /**
     * Construct the show all action
     * @param  {string} key the group key where the show all has been clicked
     */
    _showAllHandler(key) {
        if (this.props.resultsFacets[this.props.scopeFacetKey]) {
            this._scopeSelectionHandler(key);
        } else {
            let facetKey = this.props.groupingKey;
            let facetValue = key;
            this._facetSelectionHandler(facetKey, facetValue);
        }
    },
    /**
     * Construct the show more handler
     * @param  {string} key the group key where the show more has been clicked
     * @return {function}     the show more handler
     */
    _getShowMoreHandler(key) {
        return () => {
            let groupsRowsCounts = clone(this.state.groupsRowsCounts);
            groupsRowsCounts[key] = groupsRowsCounts[key] ? groupsRowsCounts[key] + this.props.showMoreAdditionalRows : this.props.initialRowsCount;
            this.setState({groupsRowsCounts});
        };
    },
    /**
     * Get the group counts object
     * @param  {object} resultsMap the results map
     * @return {object}           the counts map
     */
    _getGroupCounts(resultsMap) {
        let groupKeys = keys(resultsMap);
        if (1 === groupKeys.length) {
            return {
                [groupKeys[0]]: {
                    count: this.props.totalCount
                }
            };
        }
        let targetFacetData;
        forEach(this.props.resultsFacets, (facetData) => {
            if (isEqual(keys(facetData).sort(), groupKeys.sort())) {
                targetFacetData = facetData;
                return false;
            }
        });
        return reduce(targetFacetData, (result, data, key) => {
            result[key] = data.count;
            return result;
        }, {});
    },
    /**
     * Scope selection handler
     * @param  {string} key the scope key
     */
    _scopeSelectionHandler(key) {
        this.props.action.updateProperties({
            scope: key
        });
    },
    /**
     * Facet selection handler
     * @param  {string} key the facet key
     * @param  {string} value the facet value
     */
    _facetSelectionHandler(key, value) {
        let selectedFacets = assign({}, this.props.store.getSelectedFacets(), {
            [key]: {
                key: value,
                data: {
                    label: value,
                    count: 0
                }
            }
        });
        this.props.action.updateProperties({
            groupingKey: undefined,
            selectedFacets
        });
    },
    /**
     * Scroll reached bottom handler
     */
    _onScrollReachedBottom() {
        if (!this.state.loading) {
            this.setState({
                loading: true
            }, () => {
                this.props.action.search(true);
            });
        }

    },
    /**
     * Render the whole component
     * @return {HMTL}      the rendered component
     */
    render() {
        // If there is no result, render the given empty component
        if (0 === this.props.totalCount) {
            return this._renderEmptyResults();
        }
        // Filter groups with no results
        let resultsMap = omit(this.props.resultsMap, (list) => {
            return 0 === list.length;
        });
        // Get the count for each group
        let groupCounts = this._getGroupCounts(this.props.resultsMap);
        // Check if there is only one group left
        if (1 === keys(resultsMap).length) {
            let key = keys(resultsMap)[0];
            let list = resultsMap[key];
            let count = groupCounts[key].count;
            return this._renderSingleGroup(list, key, count, true);
        } else {
            return (
                <div data-focus='search-results'>
                    {map(resultsMap, (list, key) => {
                        let count = groupCounts[key];
                        return this._renderSingleGroup(list, key, count);
                    })}
                </div>
            );
        }
    }
};

module.exports = builder(Results);
