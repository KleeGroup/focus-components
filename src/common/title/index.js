// Dependencies
import React from 'react';
import builder from 'focus-core/component/builder';
import type from 'focus-core/component/types';
const {uniqueId} = require('lodash/utility');


const titleMixin = {

    /**
    * Display name.
    */
    displayName: 'Title',
    /** @inheritDoc */
    getInitialState() {
        return {
            spyId: uniqueId('title_')
        };
    },
    componentWillMount () {
        console.warn('FocusComponents v0.15: the \'Title\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Title');
    },
    /**
    * Props validation
    */
    propTypes: {
        id: type('string'),
        label: type('string')
    },
    /**
    * Render the component.
    * @returns {JSX} Htm code.
    */
    render() {
        const {spyId} = this.state;
        const {id, label} = this.props;
        return <h3 data-spy={spyId} id={id}>{label}</h3>;
    }
};

module.exports = builder(titleMixin);
