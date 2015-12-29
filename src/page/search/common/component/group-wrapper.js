// Dependencies
const React = require('react');
const builder = require('focus-core').component.builder;
const clone = require('lodash/lang/clone');

const GroupWrapper = {
    getDefaultProps() {
        return ({
            groupComponent: undefined,
            groupKey: undefined,
            count: undefined,
            isUnique: false,
            showAllHandler: undefined,
            list: undefined,
            renderResultsList: undefined
        });
    },
    getInitialState() {
        return ({
            resultsDisplayedCount: this.props.initialRowsCount || 3
        });
    },
    _showMoreHandler() {
        this.setState({
            resultsDisplayedCount: this.state.resultsDisplayedCount + 3 <= this.props.list.length ? this.state.resultsDisplayedCount + 3 : this.props.list.length
        });
    },
    render() {
        const listClone = clone(this.props.list);
        const list = this.props.isUnique ? listClone : listClone.splice(0, this.state.resultsDisplayedCount);
        return (
            <this.props.groupComponent canShowMore={this.props.list.length > this.state.resultsDisplayedCount} count={this.props.count} isUnique={this.props.isUnique} groupKey={this.props.groupKey} list={list} showAllHandler={this.props.showAllHandler} showMoreHandler={this._showMoreHandler}>
                {this.props.renderResultsList(list, this.props.groupKey, this.props.count, this.props.isUnique)}
            </this.props.groupComponent>
        );
    }
};

module.exports = builder(GroupWrapper);
