import applicationStore from 'focus-core/application/built-in-store';
import application from 'focus-core/application';

const {isUndefined} = require('lodash/lang');

var applicationStateMixin = {
    /** @inheriteddoc */
    getInitialState: function getCartridgeInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount: function cartridgeWillMount() {
        this._handleChangeMode(this.state.isEdit);
        applicationStore.addModeChangeListener(this._handleChangeApplicationStatus);
        applicationStore.addRouteChangeListener(this._handleChangeApplicationStatus);
    },
    /** @inheriteddoc */
    appStateWillUnMount: function cartridgeWillUnMount() {
        applicationStore.removeModeChangeListener(this._handleChangeApplicationStatus);
        applicationStore.removeRouteChangeListener(this._handleChangeApplicationStatus);
    },
    _handleChangeApplicationStatus() {
        this.setState(this._getStateFromStore());
        this.setState({isEdit:(this.state.mode==='edit')});
        //console.log("_handleChangeApplicationStatus", this.state.isEdit);
        //console.log("_handleChangeApplicationStatus", this.props.name, this.state.mode);
    },
    _getStateFromStore: function getCartridgeStateFromStore() {
        var processMode = applicationStore.getMode();
        var mode = 'consult';
        if (processMode && processMode.edit && processMode.edit > 0) {
            mode = 'edit';
        }
        return {mode: mode, route: applicationStore.getRoute()};
    },
    _handleChangeMode(isEdit)
    {
        if (!(isUndefined(isEdit))) {
            if (isEdit) {
                application.changeMode('edit', null);
            } else {
                application.changeMode('consult', null);
            }
        }
    },
};

module.exports = applicationStateMixin;
