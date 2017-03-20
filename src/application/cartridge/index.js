import builder from 'focus-core/component/builder';
import React from 'react'
import applicationStore from 'focus-core/application/built-in-store';

const cartridgeMixin = {
    /** @inheriteddoc */
    getInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount() {
        applicationStore.addCartridgeComponentChangeListener(this._handleComponentChange);
    },
    /** @inheriteddoc */
    componentWillUnmount() {
        applicationStore.removeCartridgeComponentChangeListener(this._handleComponentChange);
    },
    /**
     * Read the component state from the connected stores.
     * @return {object} - The new state.
     */
    _getStateFromStore() {
        return { cartridgeComponent: applicationStore.getCartridgeComponent() || { component: 'div', props: {} } };
    },
    /**
     * Handle the component change cb.
     */
    _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },
    /** @inheriteddoc */
    render() {
        const {cartridgeComponent} = this.state;
        const {component: Component, props} = cartridgeComponent;
        return (
            <div data-focus='cartridge'>
                <Component {...props} />
            </div>
        );
    }
};

const builtComp = builder(cartridgeMixin);
const {component, mixin} = builtComp;

export {
    component,
    mixin
}
export default builtComp;
